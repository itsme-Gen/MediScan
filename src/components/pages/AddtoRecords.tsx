import React, { useEffect, useState } from 'react'
import Appbar from '../props/Appbar'
import { 
    Activity, ArrowBigLeft, ArrowBigRight, CircleUser, Dna, Heart,
    Phone, Pill, Save, Stethoscope, User, UserPlus
} from 'lucide-react'
import Sidebar from '../props/Sidebar'
import axios from 'axios'

const AddtoRecords = () => {
    // Extracted data 
    const [formData, setFormData] = useState<any>({})

    useEffect(() => {
        const data = localStorage.getItem("saveFormData")
        if (data) setFormData(JSON.parse(data))
    }, [])

    // Step management
    const [step, setStep] = useState<number>(1)
    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    // Step 1 states
    const [contact, setContact] = useState({
        emailAddress: '',
        homeAddress: '',
        contactNumber: '',
        emergencyContact: ''
    })
    const [reasonForVisit, setReasonForVisit] = useState("")
    const [vitalSigns, setVitalSigns] = useState({
        bodyTemperature: "",
        heartPulse: "",
        respiratoryRate: "",
        bloodPressure: ""
    })
    const [medications, setMedications] = useState([{
        medicationName: "",
        dateStarted: "",
        dosage: "",
        frequency: ""
    }])

    // Step 2 states
    const [medicalHistory, setMedicalHistory] = useState([{
        conditionName: "",
        diagnosedDate: "",
        conditionType: "",
        severity: "",
        conditionStatus: "",
        resolutionDate: ""
    }])
    const [allergies, setAllergies] = useState([{
        allergyName: "",
        allergyType: "",
        allergyReaction: "",
        severity: ""
    }])
    const [labResults, setLabResults] = useState([{
        testName: "",
        testDate: "",
        testResult: "",
        referenceRange: "",
        testFlag: ""
    }])
    const [prescriptions, setPrescriptions] = useState([{
        medicationName: "",
        dosage: "",
        quantity: "",
        datePrescribed: "",
        prescribeBy: ""
    }])

    //for adding and updating dynamic fields
    const addItem = (setter: any, template: any) => setter((prev: any) => [...prev, template])
    const updateItem = (setter: any, index: number, field: string, value: string, array: any) => {
        const updated = [...array]
        updated[index][field] = value
        setter(updated)
    }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const saveData = {
        formData,
        contact,
        reasonForVisit,
        vitalSigns,
        medications,
        medicalHistory,
        allergies,
        labResults,
        prescriptions
    }

    try {
        const response = await axios.post("http://localhost:9090/sentData", saveData)
        console.log("This is a response", response)

        setContact({ emailAddress: '', homeAddress: '', contactNumber: '', emergencyContact: '' })
        setReasonForVisit('')
        setVitalSigns({ bodyTemperature: "", heartPulse: "", respiratoryRate: "", bloodPressure: "" })
        setMedications([{ medicationName: "", dateStarted: "", dosage: "", frequency: "" }])
        setMedicalHistory([{ conditionName: "", diagnosedDate: "", conditionType: "", severity: "", conditionStatus: "", resolutionDate: "" }])
        setAllergies([{ allergyName: "", allergyType: "", allergyReaction: "", severity: "" }])
        setLabResults([{ testName: "", testDate: "", testResult: "", referenceRange: "", testFlag: "" }])
        setPrescriptions([{ medicationName: "", dosage: "", quantity: "", datePrescribed: "", prescribeBy: "" }])

        // Optionally clear localStorage too
        localStorage.removeItem("saveFormData")
        console.log("savedata:",saveData)
        alert("Record saved successfully!")
        setStep(1) // reset to the first step if multi-step
    } catch (error) {
        console.log('Error', error)
        alert("Failed to save record.")
    }
}

    return (
        <div className='addToRecords h-screen'>
            <Sidebar/>
            <div className="main-content flex-1 flex-col ml-70">
                <Appbar
                    iconTitle={UserPlus}
                    title='Add to Records'
                    firstName='Juan'
                    lastName='Dela Cruz'
                    role='Doctor'
                    icon={CircleUser}
                />

                <div className="medical-info p-15">
                    <div className="title">
                        <h1 className='text-4xl font-semibold text-primary'>Medical Information</h1>
                        <p className='text-secondary'>
                            Complete patient medical profile for {formData.firstName} {formData.middleName} {formData.lastName}
                        </p>
                    </div>

                    <div className="patient-info-card border border-gray-300 mt-10 rounded-lg">
                        <div className="title flex flex-cols gap-2 items-center m-5">
                            <User className='text-secondary'/>
                            <h3 className='text-2xl font-semibold text-primary'>Patient Information</h3>
                        </div>

                        <div className="patient-info flex flex-wrap justify-between px-10 mb-10">
                            <div className="full-name">
                                <h3 className='font-semibold'>Full Name</h3>
                                <p>{formData.firstName} {formData.middleName} {formData.lastName}</p>
                            </div>
                            <div className="birthDate">
                                <h3 className='font-semibold'>BirthDate</h3>
                                <p>{formData.birthDate}</p>
                            </div>
                            <div className="gender">
                                <h1 className='font-semibold'>Gender</h1>
                                <p>{formData.gender}</p>
                            </div>
                            <div className="idNumber">
                                <h3 className='font-semibold'>ID Number</h3>
                                <p>{formData.idNumber}</p>
                            </div>
                        </div>
                    </div>

                    <form>
                        {step === 1 && (
                            <>
                                {/* Contact Info */}
                                <div className="contact-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Phone className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Contact Information</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>

                                    <div className="contact-info flex justify-center items-center">
                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-10 mb-10 w-[90%]">
                                            <input 
                                                type="email"
                                                placeholder="Email Address"
                                                value={contact.emailAddress}
                                                onChange={e => setContact({...contact, emailAddress: e.target.value})}
                                                className='border border-gray-500 outline-primary p-2 rounded'
                                            />
                                            <input
                                                type="text"
                                                placeholder="Home Address"
                                                value={contact.homeAddress}
                                                onChange={e => setContact({...contact, homeAddress: e.target.value})}
                                                className='border border-gray-500 outline-primary p-2 rounded'
                                            />
                                            <input
                                                type="number"
                                                placeholder="Contact Number"
                                                value={contact.contactNumber}
                                                onChange={e => setContact({...contact, contactNumber: e.target.value})}
                                                className='border border-gray-500 outline-primary p-2 rounded'
                                            />
                                            <input
                                                type="number"
                                                placeholder="Emergency Contact"
                                                value={contact.emergencyContact}
                                                onChange={e => setContact({...contact, emergencyContact: e.target.value})}
                                                className='border border-gray-500 outline-primary p-2 rounded'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Reason for Visit */}
                                <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Stethoscope className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Reason for Visit</h3>
                                        </div>
                                    </div>
                                    <div className="text-area px-10 mb-5">
                                        <textarea
                                            value={reasonForVisit}
                                            onChange={e => setReasonForVisit(e.target.value)}
                                            placeholder="Type something here..."
                                            rows={5}
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                {/* Vital Signs */}
                                <div className="vital-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Activity className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Vital Signs</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>All fields are required*</em></p>
                                        </div>
                                    </div>
                                    <div className="vital-info flex justify-center">
                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-x-5 mb-10">
                                            <input
                                                type="text"
                                                placeholder="Body Temperature"
                                                value={vitalSigns.bodyTemperature}
                                                onChange={e => setVitalSigns({...vitalSigns, bodyTemperature: e.target.value})}
                                                className='p-2 rounded border border-gray-500 outline-primary'
                                            />
                                            <input
                                                type="text"
                                                placeholder="Heart Pulse"
                                                value={vitalSigns.heartPulse}
                                                onChange={e => setVitalSigns({...vitalSigns, heartPulse: e.target.value})}
                                                className='p-2 rounded border border-gray-500 outline-primary'
                                            />
                                            <input
                                                type="text"
                                                placeholder="Respiratory Rate"
                                                value={vitalSigns.respiratoryRate}
                                                onChange={e => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                                                className='p-2 rounded border border-gray-500 outline-primary'
                                            />
                                            <input
                                                type="text"
                                                placeholder="Blood Pressure"
                                                value={vitalSigns.bloodPressure}
                                                onChange={e => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                                                className='p-2 rounded border border-gray-500 outline-primary'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Next Button */}
                                <div className="button-container flex justify-center items-center m-5">
                                    <button 
                                        className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2'
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            nextStep()
                                        }}
                                    >
                                        Next
                                        <ArrowBigRight/>
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* MEDICATION */}
                                <div className="medication-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Pill className="text-secondary h-5" />
                                            <h3 className="text-2xl font-semibold text-primary">Current Medication</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className="text-sm text-gray-500"><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>
                                    <div className="medication-info flex justify-center mb-10">
                                        <div className="grid w-[90%] gap-6">
                                            {medications.map((med, i) => (
                                                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 mb-3">
                                                    <input placeholder="Medication Name" value={med.medicationName} onChange={e => updateItem(setMedications, i, "medicationName", e.target.value, medications)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="date" placeholder="Date Started" value={med.dateStarted} onChange={e => updateItem(setMedications, i, "dateStarted", e.target.value, medications)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Dosage" value={med.dosage} onChange={e => updateItem(setMedications, i, "dosage", e.target.value, medications)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Frequency" value={med.frequency} onChange={e => updateItem(setMedications, i, "frequency", e.target.value, medications)} className="p-2 border border-gray-500 rounded" />
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="bg-primary text-white px-3 py-1 rounded mt-2"
                                                onClick={() => addItem(setMedications, { medicationName: "", dateStarted: "", dosage: "", frequency: "" })}
                                            >
                                                + Add Medication
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* MEDICAL HISTORY */}
                                <div className="medical-history-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Heart className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Medical History</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>
                                    <div className="medical-history-info flex justify-center mb-10">
                                        <div className="grid w-[90%] gap-6">
                                            {medicalHistory.map((mh, i) => (
                                                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-3">
                                                    <input placeholder="Condition Name" value={mh.conditionName} onChange={e => updateItem(setMedicalHistory, i, "conditionName", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="date" placeholder="Diagnose Date" value={mh.diagnosedDate} onChange={e => updateItem(setMedicalHistory, i, "diagnosedDate", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Condition Type" value={mh.conditionType} onChange={e => updateItem(setMedicalHistory, i, "conditionType", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Severity" value={mh.severity} onChange={e => updateItem(setMedicalHistory, i, "severity", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Condition Status" value={mh.conditionStatus} onChange={e => updateItem(setMedicalHistory, i, "conditionStatus", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="date" placeholder="Resolution Date" value={mh.resolutionDate} onChange={e => updateItem(setMedicalHistory, i, "resolutionDate", e.target.value, medicalHistory)} className="p-2 border border-gray-500 rounded" />
                                                </div>
                                            ))}
                                            <button type="button" className="bg-primary text-white px-3 py-1 rounded mt-2" onClick={() => addItem(setMedicalHistory, { conditionName: "", diagnosedDate: "", conditionType: "", severity: "", conditionStatus: "", resolutionDate: "" })}>
                                                + Add Medical History
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* ALLERGIES */}
                                <div className="allergies-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Dna className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Allergies</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>
                                    <div className="allergies-info flex justify-center mb-10">
                                        <div className="grid w-[90%] gap-6">
                                            {allergies.map((al, i) => (
                                                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-3">
                                                    <input placeholder="Allergy Name" value={al.allergyName} onChange={e => updateItem(setAllergies, i, "allergyName", e.target.value, allergies)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Allergy Type" value={al.allergyType} onChange={e => updateItem(setAllergies, i, "allergyType", e.target.value, allergies)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Allergy Reaction" value={al.allergyReaction} onChange={e => updateItem(setAllergies, i, "allergyReaction", e.target.value, allergies)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Severity" value={al.severity} onChange={e => updateItem(setAllergies, i, "severity", e.target.value, allergies)} className="p-2 border border-gray-500 rounded" />
                                                </div>
                                            ))}
                                            <button type="button" className="bg-primary text-white px-3 py-1 rounded mt-2" onClick={() => addItem(setAllergies, { allergyName: "", allergyType: "", allergyReaction: "", severity: "" })}>
                                                + Add Allergy
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* LAB RESULTS */}
                                <div className="lab-result-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Dna className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Lab Results</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>
                                    <div className="labResult-info flex justify-center mb-10">
                                        <div className="grid w-[90%] gap-6">
                                            {labResults.map((lr, i) => (
                                                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-3">
                                                    <input placeholder="Test Name" value={lr.testName} onChange={e => updateItem(setLabResults, i, "testName", e.target.value, labResults)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="date" placeholder="Test Date" value={lr.testDate} onChange={e => updateItem(setLabResults, i, "testDate", e.target.value, labResults)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Test Result" value={lr.testResult} onChange={e => updateItem(setLabResults, i, "testResult", e.target.value, labResults)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Reference Range" value={lr.referenceRange} onChange={e => updateItem(setLabResults, i, "referenceRange", e.target.value, labResults)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Flag" value={lr.testFlag} onChange={e => updateItem(setLabResults, i, "testFlag", e.target.value, labResults)} className="p-2 border border-gray-500 rounded" />
                                                </div>
                                            ))}
                                            <button type="button" className="bg-primary text-white px-3 py-1 rounded mt-2" onClick={() => addItem(setLabResults, { testName: "", testDate: "", testResult: "", referenceRange: "", testFlag: "" })}>
                                                + Add Lab Result
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* PRESCRIPTIONS */}
                                <div className="prescription-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Pill className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Prescriptions</h3>
                                        </div>
                                        <div className="sub-text">
                                            <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                        </div>
                                    </div>
                                    <div className="prescription-info flex justify-center mb-10">
                                        <div className="grid w-[90%] gap-6">
                                            {prescriptions.map((pr, i) => (
                                                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-3">
                                                    <input placeholder="Medication Name" value={pr.medicationName} onChange={e => updateItem(setPrescriptions, i, "medicationName", e.target.value, prescriptions)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Dosage" value={pr.dosage} onChange={e => updateItem(setPrescriptions, i, "dosage", e.target.value, prescriptions)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="number" placeholder="Quantity" value={pr.quantity} onChange={e => updateItem(setPrescriptions, i, "quantity", e.target.value, prescriptions)} className="p-2 border border-gray-500 rounded" />
                                                    <input type="date" placeholder="Date Prescribed" value={pr.datePrescribed} onChange={e => updateItem(setPrescriptions, i, "datePrescribed", e.target.value, prescriptions)} className="p-2 border border-gray-500 rounded" />
                                                    <input placeholder="Prescribed By" value={pr.prescribeBy} onChange={e => updateItem(setPrescriptions, i, "prescribeBy", e.target.value, prescriptions)} className="p-2 border border-gray-500 rounded" />
                                                </div>
                                            ))}
                                            <button type="button" className="bg-primary text-white px-3 py-1 rounded mt-2" onClick={() => addItem(setPrescriptions, { medicationName: "", dosage: "", quantity: "", datePrescribed: "", prescribeBy: "" })}>
                                                + Add Prescription
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Previous & Save Buttons */}
                                <div className="button-container flex justify-center items-center m-5 gap-4">
                                    <button className='bg-primary rounded px-6 py-2 text-white flex items-center gap-2' onClick={(e)=>{ e.preventDefault(); prevStep() }}>
                                        <ArrowBigLeft/> Previous
                                    </button>
                                    <button className='bg-primary rounded px-6 py-2 text-white flex items-center gap-2' onClick={handleSave}>
                                        <Save/> Save to Records
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddtoRecords
