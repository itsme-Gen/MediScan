const express = require('express');
const cors = require('cors');

// Models
const Allergies = require('../../Models/Allergies');
const LabResults = require('../../Models/LabResults');
const MedicalHistory = require('../../Models/MedicalHistory');
const Medication = require('../../Models/Medication');
const Patient = require('../../Models/Patient');
const Prescriptions = require('../../Models/Prescription');
const ReasonVisit = require('../../Models/ReasonForVisit');
const VitalSign = require('../../Models/VitalSign');
const PatientVisits = require('../../Models/PatientVisits');

const router = express.Router();
router.use(express.json());
router.use(cors());

// Diagnostic endpoint to check patient_visits collection
router.get("/patientvisits/check", async (req, res) => {
    try {
        const count = await PatientVisits.countDocuments();
        const records = await PatientVisits.find().limit(5);
        res.status(200).json({
            success: true,
            message: "Patient visits collection check",
            totalRecords: count,
            recentRecords: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error checking patient visits",
            error: error.message
        });
    }
});

router.post("/registerpatient", async (req, res) => {
    const { patient: patientData, visit, vitalSigns, medications, medicalHistory, allergies, labResults, prescriptions, doctorId, doctorName, doctorRole, department } = req.body;
    console.log("\n=== PATIENT REGISTRATION REQUEST ===");
    console.log("Received doctorId:", doctorId, "Type:", typeof doctorId);
    console.log("Received doctorName:", doctorName, "Type:", typeof doctorName);
    console.log("Received doctorRole:", doctorRole, "Type:", typeof doctorRole);
    console.log("Received department:", department, "Type:", typeof department);
    console.log("Request Body keys:", Object.keys(req.body));
    
    try {
        //Create patient
        const newPatient = await Patient.create({ ...patientData });
        const patientId = newPatient._id;
        console.log("✅ Patient created with ID:", patientId);

        //Create reason for visit
        if (visit) {
            await ReasonVisit.create({ ...visit, patientId });
            console.log("✅ Reason for visit created");
        }

        //Create vital signs
       if (vitalSigns) {
            await VitalSign.create({ ...vitalSigns, patientId });
            console.log("✅ Vital signs created");
        }

        //Create medications
        if (medications && medications.length) {
            const medsWithPatientId = medications.map(m => ({ ...m, patientId }));
            await Medication.insertMany(medsWithPatientId);
            console.log("✅ Medications created:", medications.length);
        }

        //Create medical history
        if (medicalHistory && medicalHistory.length) {
            const historyWithPatientId = medicalHistory.map(h => ({ ...h, patientId }));
            await MedicalHistory.insertMany(historyWithPatientId);
            console.log("✅ Medical history created:", medicalHistory.length);
        }

        //Create allergies
        if (allergies && allergies.length) {
            const allergiesWithPatientId = allergies.map(a => ({ ...a, patientId }));
            await Allergies.insertMany(allergiesWithPatientId);
            console.log("✅ Allergies created:", allergies.length);
        }

        //Create lab results
        if (labResults && labResults.length) {
            const labWithPatientId = labResults.map(l => ({ ...l, patientId }));
            await LabResults.insertMany(labWithPatientId);
            console.log("✅ Lab results created:", labResults.length);
        }

        //Create prescriptions
        if (prescriptions && prescriptions.length) {
            const prescriptionsWithPatientId = prescriptions.map(p => ({ ...p, patientId }));
            await Prescriptions.insertMany(prescriptionsWithPatientId);
            console.log("✅ Prescriptions created:", prescriptions.length);
        }

        // Create patient visit record with doctor/nurse info
        console.log("\n--- PATIENT VISIT CREATION ---");
        console.log("doctorId exists?", !!doctorId);
        console.log("doctorName exists?", !!doctorName);
        
        if (doctorId && doctorName) {
            try {
                const visitData = {
                    patientId,
                    doctorId,
                    doctorName,
                    doctorRole: doctorRole || 'Doctor',
                    department,
                    visitReason: visit?.reason_for_visit || '',
                    visitDate: new Date(),
                    recordsSaved: {
                        vitalSigns: !!vitalSigns,
                        medications: !!(medications && medications.length),
                        medicalHistory: !!(medicalHistory && medicalHistory.length),
                        allergies: !!(allergies && allergies.length),
                        labResults: !!(labResults && labResults.length),
                        prescriptions: !!(prescriptions && prescriptions.length)
                    }
                };
                
                console.log("Creating patient visit with data:", JSON.stringify(visitData, null, 2));
                const visitRecord = await PatientVisits.create(visitData);
                console.log("✅ PATIENT VISIT CREATED SUCCESSFULLY! ID:", visitRecord._id);
                console.log("Document in DB:", visitRecord);
            } catch (visitError) {
                console.error("❌ ERROR CREATING PATIENT VISIT");
                console.error("Error message:", visitError.message);
                console.error("Error name:", visitError.name);
                console.error("Full error object:", visitError);
                if (visitError.errors) {
                    console.error("Validation errors:", visitError.errors);
                }
            }
        } else {
            console.warn("⚠️ CANNOT CREATE PATIENT VISIT - Doctor info missing!");
            console.warn("doctorId:", doctorId);
            console.warn("doctorName:", doctorName);
        }

       return res.status(200).json({ success: true, message: "Patient registered successfully", patientId });
    } catch (error) {
        console.error('❌ MAIN ERROR:', error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;

