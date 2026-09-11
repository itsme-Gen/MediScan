from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
from PIL import Image
import numpy as np
from io import BytesIO
import re
import gc

app = Flask(__name__)
CORS(app)

#Initialize reader as None, load on first request
reader = None

def get_reader():
    """Lazy load EasyOCR reader"""
    global reader
    if reader is None:
        print(" Initializing EasyOCR reader (this may take a moment)...")
        reader = easyocr.Reader(['en', 'tl'], gpu=False, verbose=False)
        print("EasyOCR reader ready!")
    return reader

def clean_text(text):
    """Remove extra spaces and normalize text"""
    return ' '.join(text.split()).strip()

def extract_philid_fields(ocr_results):
    """
    Extract specific fields from Philippine National ID (PhilID) OCR results.
    Returns a dict with extracted information.
    """
   
    texts = [clean_text(text) for (_, text, _) in ocr_results]
    full_text = " ".join(texts)
    
    # Initialize fields
    extracted = {
        "id_number": "Not found",
        "last_name": "Not found",
        "first_name": "Not found",
        "middle_name": "Not found",
        "date_of_birth": "Not found",
        "gender": "Not found",
        "address": "Not found",
        "raw_text": texts
    }
    
    # Extract ID Number 
    id_pattern = r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b'
    id_match = re.search(id_pattern, full_text)
    if id_match:
        extracted["id_number"] = id_match.group().replace(' ', '-')
 
    used_indices = set()
    
    def find_and_extract(label_keywords, is_label=True):
        """Find a label and return the next valid non-label text"""
        for i, text in enumerate(texts):
            text_upper = text.upper().strip()
            
           
            if any(keyword in text_upper for keyword in label_keywords):
                if '/' in text:
                    remaining = text.split('/', 1)[-1].strip()
                    if remaining and len(remaining) > 1 and not remaining.upper() in label_keywords:
                        return remaining, i + 1
                
                # Look for value in next lines
                for j in range(i + 1, min(i + 3, len(texts))):
                    if j in used_indices:
                        continue
                    
                    next_text = texts[j].strip()
                    next_upper = next_text.upper()
                    
                    
                    label_keywords_all = ['APELYIDO', 'PANGALAN', 'GITNANG', 'LAST NAME', 
                                         'FIRST NAME', 'MIDDLE NAME', 'GIVEN NAME', 'PETSA', 
                                         'DATE', 'BIRTH', 'KASARIAN', 'SEX', 'GENDER', 
                                         'TIRAHAN', 'ADDRESS', 'EMAIL', 'MOBILE']
                    
                    if (len(next_text) > 1 and 
                        not any(lbl in next_upper for lbl in label_keywords_all) and
                        next_text.upper() == next_text):  # Likely a name (all caps)
                        return next_text, j
        
        return None, None
    
    # Extract LAST NAME (Apelyido)
    last_name, idx = find_and_extract(['APELYIDO', 'LAST NAME'])
    if last_name:
        extracted["last_name"] = last_name
        used_indices.add(idx)
        print(f" Found Last Name: {last_name}")
    
    # Extract FIRST NAME 
    first_name_found = False
    for i, text in enumerate(texts):
        text_upper = text.upper().strip()
        
        # Look for PANGALAN or GIVEN NAME or FIRST NAME 
        if ((('PANGALAN' in text_upper and 'GITNANG' not in text_upper) or 
             ('GIVEN NAME' in text_upper and 'MIDDLE' not in text_upper) or 
             ('FIRST NAME' in text_upper and 'MIDDLE' not in text_upper)) and
            i not in used_indices):
            
            # Check for inline value
            if '/' in text:
                remaining = text.split('/', 1)[-1].strip()
                if remaining and len(remaining) > 1 and not any(lbl in remaining.upper() for lbl in ['GIVEN NAME', 'FIRST NAME', 'MIDDLE NAME']):
                    extracted["first_name"] = remaining
                    used_indices.add(i)
                    print(f"Found First Name: {remaining}")
                    first_name_found = True
                    break
            
            # Check next lines
            for j in range(i + 1, min(i + 3, len(texts))):
                if j in used_indices:
                    continue
                
                next_text = texts[j].strip()
                if (len(next_text) > 1 and next_text.upper() == next_text and
                    not any(lbl in next_text.upper() for lbl in 
                           ['APELYIDO', 'GITNANG', 'PETSA', 'DATE', 'KASARIAN', 'SEX', 'TIRAHAN', 'GIVEN NAME', 'FIRST NAME', 'MIDDLE NAME'])):
                    extracted["first_name"] = next_text
                    used_indices.add(j)
                    print(f"Found First Name: {next_text}")
                    first_name_found = True
                    break
            
            if first_name_found:
                break
    
    # Extract MIDDLE NAME 
    middle_name_found = False
    for i, text in enumerate(texts):
        text_upper = text.upper().strip()
        
        if (('GITNANG' in text_upper or 'MIDDLE NAME' in text_upper) and i not in used_indices):
            # Check for inline value
            if '/' in text:
                remaining = text.split('/', 1)[-1].strip()
                if remaining and len(remaining) > 1 and not any(lbl in remaining.upper() for lbl in ['MIDDLE NAME', 'GITNANG']):
                    extracted["middle_name"] = remaining
                    used_indices.add(i)
                    print(f"Found Middle Name: {remaining}")
                    middle_name_found = True
                    break
            
            # Check next lines
            for j in range(i + 1, min(i + 3, len(texts))):
                if j in used_indices:
                    continue
                
                next_text = texts[j].strip()
                if (len(next_text) > 1 and next_text.upper() == next_text and
                    not any(lbl in next_text.upper() for lbl in 
                           ['APELYIDO', 'PANGALAN', 'PETSA', 'DATE', 'KASARIAN', 'SEX', 'TIRAHAN', 'MIDDLE NAME', 'GIVEN NAME', 'FIRST NAME'])):
                    extracted["middle_name"] = next_text
                    used_indices.add(j)
                    print(f"Found Middle Name: {next_text}")
                    middle_name_found = True
                    break
            
            if middle_name_found:
                break
    
    # Extract Date of Birth
    dob_patterns = [
        r'\b(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)\s+\d{1,2},?\s+\d{4}\b',
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{4}\b',
        r'\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b'
    ]
    
    for pattern in dob_patterns:
        dob_match = re.search(pattern, full_text, re.IGNORECASE)
        if dob_match:
            extracted["date_of_birth"] = dob_match.group()
            break
    
    # Extract Gender
    gender_keywords = {
        'MALE': ['MALE', 'LALAKI'],
        'FEMALE': ['FEMALE', 'BABAE']
    }
    
    for gender, keywords in gender_keywords.items():
        for keyword in keywords:
            if re.search(r'\b' + keyword + r'\b', full_text.upper()):
                extracted["gender"] = gender
                break
        if extracted["gender"] != "Not found":
            break
    
    # Extract Complete Address
    address_parts = []
    capture_address = False
    address_start_index = -1
    
    for i, text in enumerate(texts):
        text_upper = text.upper()
        
        if 'TIRAHAN' in text_upper or ('ADDRESS' in text_upper and 'EMAIL' not in text_upper):
            capture_address = True
            address_start_index = i
            
            if '/' in text:
                remaining = text.split('/', 1)[-1].strip()
                if remaining and len(remaining) > 3:
                    address_parts.append(remaining)
            elif ':' in text:
                remaining = text.split(':', 1)[-1].strip()
                if remaining and len(remaining) > 3:
                    address_parts.append(remaining)
            continue
        
        if capture_address and i > address_start_index:
            text_upper = text.upper()
            
            stop_keywords = [
                'REPUBLIC', 'PILIPINAS', 'PHILIPPINES', 
                'ISSUED', 'VALID', 'EXPIRE',
                'PCN', 'CRN', 'SIGNATURE',
                'PHILIPPINE IDENTIFICATION', 'NATIONAL ID'
            ]
            
            if any(keyword in text_upper for keyword in stop_keywords):
                break
            
            field_labels = ['PANGALAN', 'APELYIDO', 'GITNANG']
            if any(label in text_upper for label in field_labels):
                break
            
            if re.match(r'^\d{1,2}[/-]\d{1,2}[/-]\d{4}$', text.strip()):
                break
            
            if re.match(r'^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$', text.strip()):
                break
            
            address_parts.append(text)
            
            if len(address_parts) >= 5:
                break
    
    if address_parts:
        full_address = ' '.join(address_parts).strip()
        full_address = re.sub(r'\s+', ' ', full_address)
        full_address = re.sub(r',\s*$', '', full_address)
        extracted["address"] = full_address
    
    return extracted

@app.route('/extract-info', methods=['POST'])
def extract_philid_info():
    """Endpoint to extract information from Philippine National ID"""
    print("\n" + "="*50)
    print(" Received request to /extract-info")
    print("="*50)
    
    if 'file' not in request.files:
        print(" Error: No file in request")
        return jsonify({
            'success': False,
            'error': 'No file uploaded'
        }), 400

    file = request.files['file']
    print(f" File received: {file.filename}")
    print(f" Content type: {file.content_type}")
    
    if file.filename == '':
        print(" Error: Empty filename")
        return jsonify({
            'success': False,
            'error': 'No file selected'
        }), 400

    try:
        # Read and preprocess image
        print(" Reading image...")
        image_bytes = file.read()
        print(f"📏 Image size: {len(image_bytes)} bytes ({len(image_bytes) / 1024 / 1024:.2f} MB)")
        
        if len(image_bytes) > 10 * 1024 * 1024:
            return jsonify({
                'success': False,
                'error': 'Image too large. Please upload an image smaller than 10MB.'
            }), 400
        
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        print(f"Image loaded: {image.size[0]}x{image.size[1]} pixels")
        
        max_size = 1280
        if max(image.size) > max_size:
            print(f"Resizing image (original: {image.size})...")
            image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            print(f"Resized to: {image.size}")
        
        image_np = np.array(image)
        
        del image_bytes
        gc.collect()

        ocr_reader = get_reader()
        
        print("🔍 Starting OCR processing...")
        results = ocr_reader.readtext(image_np, detail=1)
        print(f"OCR completed. Found {len(results)} text elements.")
        
        del image_np
        gc.collect()
        
        if len(results) == 0:
            print("Warning: No text detected in image")
            return jsonify({
                'success': False,
                'error': 'No text detected in the image. Please ensure the ID is clear and well-lit.'
            }), 400

        print("🔧 Extracting PhilID fields...")
        extracted_info = extract_philid_fields(results)
        
        print("Extracted Information:")
        for key, value in extracted_info.items():
            if key != 'raw_text':
                print(f"   {key}: {value}")

        response = {
            "success": True,
            "id_number": extracted_info["id_number"],
            "first_name": extracted_info["first_name"],
            "middle_name": extracted_info["middle_name"],
            "last_name": extracted_info["last_name"],
            "date_of_birth": extracted_info["date_of_birth"],
            "gender": extracted_info["gender"],
            "address": extracted_info["address"],
            "raw_text": extracted_info["raw_text"]
        }

        print("Response prepared successfully")
        print("="*50 + "\n")
        return jsonify(response), 200

    except Exception as e:
        print(f"Error processing image: {str(e)}")
        print(f" Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        print("="*50 + "\n")
        
        gc.collect()
        
        return jsonify({
            'success': False,
            'error': f'Processing error: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'service': 'PhilID OCR Extractor',
        'version': '1.0'
    }), 200

@app.route('/', methods=['GET'])
def home():
    """Root endpoint"""
    return jsonify({
        'message': 'PhilID OCR API is running',
        'endpoints': {
            '/extract-info': 'POST - Extract information from PhilID image',
            '/health': 'GET - Health check'
        }
    }), 200

if __name__ == "__main__":
    print("Starting PhilID OCR Extractor Server...") 
    app.run(host='0.0.0.0', port=5001, debug=False, threaded=True)