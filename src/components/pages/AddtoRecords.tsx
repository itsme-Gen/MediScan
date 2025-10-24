import React, { useEffect, useState } from 'react'
import Appbar from '../props/Appbar'
import { 
    Activity, ArrowBigLeft, ArrowBigRight, CircleUser, Dna, Heart,
    Phone, Pill, Save, Stethoscope, User, UserPlus
} from 'lucide-react'
import Sidebar from '../props/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddtoRecords = () => {
    const [formData, setFormData] = useState<any>({})
    const navigate = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem("saveFormData")
        if (data) setFormData(JSON.parse(data))
    }, [])

    const [step, setStep] = useState<number>(1)
    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

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
        frequency:"",
        datePrescribed: "",
        prescribeBy: ""
    }])

    const addItem = (setter: any, template: any) => setter((prev: any) => [...prev, template])
    const updateItem = (setter: any, index: number, field: string, value: string, array: any) => {
        const updated = [...array]
        updated[index][field] = value
        setter(updated)
    }

    const removeItem = (setter: any, index: number, array: any) => {
    const updated = array.filter((_: any, i: number) => i !== index);
    setter(updated);
};


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const saveData = {
            patient: {
                first_name: formData.firstName,
                middle_name: formData.middleName,
                last_name: formData.lastName,
                id_number: formData.idNumber,
                date_of_birth: formData.birthDate,
                gender: formData.gender,
                contact_number: contact.contactNumber,
                email_address: contact.emailAddress,
                home_address: contact.homeAddress,
                emergency_contact_number: contact.emergencyContact,
            },
            visit: { reason_for_visit: reasonForVisit },
            vitalSigns: {
                body_temperature: vitalSigns.bodyTemperature,
                heart_pulse: vitalSigns.heartPulse,
                respiratory_rate: vitalSigns.respiratoryRate,
                blood_pressure: vitalSigns.bloodPressure
            },
            medications: medications.map(m => ({
                medication_name: m.medicationName,
                start_date: m.dateStarted,
                dosage: m.dosage,
                frequency: m.frequency
            })),
            medicalHistory: medicalHistory.map(mh => ({
                condition_name: mh.conditionName,
                diagnosis_date: mh.diagnosedDate,
                condition_type: mh.conditionType,
                severity: mh.severity,
                status: mh.conditionStatus,
                resolution_date: mh.resolutionDate
            })),
            allergies: allergies.map(a => ({
                allergen_name: a.allergyName,
                allergy_type: a.allergyType,
                reaction: a.allergyReaction,
                severity: a.severity
            })),
            labResults: labResults.map(lr => ({
                test_name: lr.testName,
                test_date: lr.testDate,
                test_result: lr.testResult,
                reference_range: lr.referenceRange,
                abnormal_flag: lr.testFlag
            })),
            prescriptions: prescriptions.map(p => ({
                medication_name: p.medicationName,
                dosage: p.dosage,
                quantity: p.quantity,
                date_prescribed: p.datePrescribed,
                prescribing_provider: p.prescribeBy,
                frequency: p.frequency
            }))
        };

        try {
            const response = await axios.post("http://localhost:8080/registerpatient", saveData);
            console.log("Response:", response.data);

            localStorage.removeItem("saveFormData")
            localStorage.removeItem("saveData")
            localStorage.removeItem("saveImage")
            localStorage.removeItem("medicalHistory")
            toast.dismiss()
            toast.success("Record saved successfully!")
            navigate("/dashboard")

            setContact({ emailAddress: '', homeAddress: '', contactNumber: '', emergencyContact: '' });
            setReasonForVisit('');
            setVitalSigns({ bodyTemperature: "", heartPulse: "", respiratoryRate: "", bloodPressure: "" });
            setMedications([{ medicationName: "", dateStarted: "", dosage: "", frequency: "" }]);
            setMedicalHistory([{ conditionName: "", diagnosedDate: "", conditionType: "", severity: "", conditionStatus: "", resolutionDate: "" }]);
            setAllergies([{ allergyName: "", allergyType: "", allergyReaction: "", severity: "" }]);
            setLabResults([{ testName: "", testDate: "", testResult: "", referenceRange: "", testFlag: "" }]);
            setPrescriptions([{ medicationName: "", dosage: "", quantity: "", frequency: "", datePrescribed: "", prescribeBy: "" }]);
            setStep(1);
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Failed to save record. Check server logs for details.");
        }
    };

    return (
        <div className='addToRecords h-screen'>
            <Sidebar/>
            <div className="main-content flex-1 flex-col ml-70">
                <Appbar
                    iconTitle={UserPlus}
                    title='Add to Records'
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
                                {/* CONTACT INFORMATION */}
                                <div className="contact-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Phone className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Contact Information</h3>
                                        </div>
                                        <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                    </div>
                                    <div className="contact-info flex justify-center items-center">
                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-10 mb-10 w-[90%]">
                                            <div className="flex flex-col">
                                                <label htmlFor="emailAddress" className="font-semibold text-sm text-gray-700">Email Address</label>
                                                <input id="emailAddress" type="email" placeholder="Email Address" value={contact.emailAddress} onChange={e => setContact({...contact, emailAddress: e.target.value})} className='border border-gray-500 outline-primary p-2 rounded'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="homeAddress" className="font-semibold text-sm text-gray-700">Home Address</label>
                                                <input id="homeAddress" type="text" placeholder="Home Address" value={contact.homeAddress} onChange={e => setContact({...contact, homeAddress: e.target.value})} className='border border-gray-500 outline-primary p-2 rounded'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="contactNumber" className="font-semibold text-sm text-gray-700">Contact Number</label>
                                                <input id="contactNumber" type="number" placeholder="Contact Number" value={contact.contactNumber} onChange={e => setContact({...contact, contactNumber: e.target.value})} className='border border-gray-500 outline-primary p-2 rounded'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="emergencyContact" className="font-semibold text-sm text-gray-700">Emergency Contact</label>
                                                <input id="emergencyContact" type="number" placeholder="Emergency Contact" value={contact.emergencyContact} onChange={e => setContact({...contact, emergencyContact: e.target.value})} className='border border-gray-500 outline-primary p-2 rounded'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* REASON FOR VISIT */}
                                <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Stethoscope className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Reason for Visit</h3>
                                        </div>
                                    </div>
                                    <div className="text-area px-10 mb-5">
                                        <label htmlFor="reasonForVisit" className="font-semibold text-sm text-gray-700">Reason</label>
                                        <textarea id="reasonForVisit" value={reasonForVisit} onChange={e => setReasonForVisit(e.target.value)} placeholder="Type something here..." rows={5} className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                    </div>
                                </div>

                                {/* VITAL SIGNS */}
                                <div className="vital-info-card border border-gray-300 mt-10 rounded-lg">
                                    <div className="title flex flex-col m-5">
                                        <div className="main-text flex flex-cols items-center gap-2">
                                            <Activity className='text-secondary h-5'/>
                                            <h3 className='text-2xl font-semibold text-primary'>Vital Signs</h3>
                                        </div>
                                        <p className='text-sm text-gray-500'><em>All fields are required*</em></p>
                                    </div>
                                    <div className="vital-info flex justify-center">
                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-x-5 mb-10">
                                            <div className="flex flex-col">
                                                <label htmlFor="bodyTemperature" className="font-semibold text-sm text-gray-700">Body Temperature</label>
                                                <input id="bodyTemperature" type="text" placeholder="Body Temperature" value={vitalSigns.bodyTemperature} onChange={e => setVitalSigns({...vitalSigns, bodyTemperature: e.target.value})} className='p-2 rounded border border-gray-500 outline-primary'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="heartPulse" className="font-semibold text-sm text-gray-700">Heart Pulse</label>
                                                <input id="heartPulse" type="text" placeholder="Heart Pulse" value={vitalSigns.heartPulse} onChange={e => setVitalSigns({...vitalSigns, heartPulse: e.target.value})} className='p-2 rounded border border-gray-500 outline-primary'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="respiratoryRate" className="font-semibold text-sm text-gray-700">Respiratory Rate</label>
                                                <input id="respiratoryRate" type="text" placeholder="Respiratory Rate" value={vitalSigns.respiratoryRate} onChange={e => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})} className='p-2 rounded border border-gray-500 outline-primary'/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="bloodPressure" className="font-semibold text-sm text-gray-700">Blood Pressure</label>
                                                <input id="bloodPressure" type="text" placeholder="Blood Pressure" value={vitalSigns.bloodPressure} onChange={e => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})} className='p-2 rounded border border-gray-500 outline-primary'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* NEXT BUTTON */}
                                <div className="button-container flex justify-center items-center m-5">
                                    <button className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2' onClick={(e)=>{e.preventDefault(); nextStep();}}>
                                        Next
                                        <ArrowBigRight/>
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                        {/* MEDICATIONS */}
                        <div className="medication-info-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                <Pill className="text-secondary h-5" />
                                <h3 className="text-2xl font-semibold text-primary">Medications</h3>
                                </div>
                                <p className="text-sm text-gray-500">
                                <em>All current and past medications</em>
                                </p>
                            </div>
                            {medications.map((m, index) => (
                            <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-5 mb-5 mx-10"
                            >
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-5 mb-3">
                                <div className="flex flex-col">
                                    <label htmlFor={`medicationName-${index}`} className="font-semibold text-sm text-gray-700">
                                    Medication Name
                                    </label>
                                    <input
                                    id={`medicationName-${index}`}
                                    type="text"
                                    placeholder="Medication Name"
                                    value={m.medicationName}
                                    onChange={(e) =>
                                        updateItem(setMedications, index, "medicationName", e.target.value, medications)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`dateStarted-${index}`} className="font-semibold text-sm text-gray-700">
                                    Date Started
                                    </label>
                                    <input
                                    id={`dateStarted-${index}`}
                                    type="date"
                                    value={m.dateStarted}
                                    onChange={(e) =>
                                        updateItem(setMedications, index, "dateStarted", e.target.value, medications)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`dosage-${index}`} className="font-semibold text-sm text-gray-700">
                                    Dosage
                                    </label>
                                    <input
                                    id={`dosage-${index}`}
                                    type="text"
                                    placeholder="Dosage"
                                    value={m.dosage}
                                    onChange={(e) =>
                                        updateItem(setMedications, index, "dosage", e.target.value, medications)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`frequency-${index}`} className="font-semibold text-sm text-gray-700">
                                    Frequency
                                    </label>
                                    <input
                                    id={`frequency-${index}`}
                                    type="text"
                                    placeholder="Frequency"
                                    value={m.frequency}
                                    onChange={(e) =>
                                        updateItem(setMedications, index, "frequency", e.target.value, medications)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>
                                </div>

                                {/*Remove button */}
                                {medications.length > 1 && (
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => removeItem(setMedications, index, medications)}
                                >
                                    Remove
                                </button>
                                )}
                            </div>
                            ))}

                            {/* Add button */}
                            <div className="flex justify-center mb-5">
                            <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded"
                                onClick={() =>
                                addItem(setMedications, {
                                    medicationName: "",
                                    dateStarted: "",
                                    dosage: "",
                                    frequency: "",
                                })
                                }
                            >
                                + Add Medication
                            </button>
                            </div>
                            </div>

                            {/* MEDICAL HISTORY */}
                            <div className="medical-history-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                <Heart className="text-secondary h-5" />
                                <h3 className="text-2xl font-semibold text-primary">Medical History</h3>
                                </div>
                                <p className="text-sm text-gray-500"><em>Past medical conditions</em></p>
                            </div>

                            {medicalHistory.map((h, index) => (
                                <div
                                    key={index}
                                    className="relative border border-gray-300 rounded-lg p-5 mb-5 mx-10"
                                >
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-5 mb-3">
                                    <div className="flex flex-col">
                                        <label htmlFor={`conditionName-${index}`} className="font-semibold text-sm text-gray-700">
                                        Condition Name
                                        </label>
                                        <input
                                        id={`conditionName-${index}`}
                                        type="text"
                                        placeholder="Condition Name"
                                        value={h.conditionName}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "conditionName", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`diagnosedDate-${index}`} className="font-semibold text-sm text-gray-700">
                                        Diagnosed Date
                                        </label>
                                        <input
                                        id={`diagnosedDate-${index}`}
                                        type="date"
                                        value={h.diagnosedDate}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "diagnosedDate", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`conditionType-${index}`} className="font-semibold text-sm text-gray-700">
                                        Condition Type
                                        </label>
                                        <input
                                        id={`conditionType-${index}`}
                                        type="text"
                                        placeholder="Type"
                                        value={h.conditionType}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "conditionType", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`severity-${index}`} className="font-semibold text-sm text-gray-700">
                                        Severity
                                        </label>
                                        <input
                                        id={`severity-${index}`}
                                        type="text"
                                        placeholder="Severity"
                                        value={h.severity}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "severity", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`conditionStatus-${index}`} className="font-semibold text-sm text-gray-700">
                                        Status
                                        </label>
                                        <input
                                        id={`conditionStatus-${index}`}
                                        type="text"
                                        placeholder="Status"
                                        value={h.conditionStatus}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "conditionStatus", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`resolutionDate-${index}`} className="font-semibold text-sm text-gray-700">
                                        Resolution Date
                                        </label>
                                        <input
                                        id={`resolutionDate-${index}`}
                                        type="date"
                                        value={h.resolutionDate}
                                        onChange={(e) =>
                                            updateItem(setMedicalHistory, index, "resolutionDate", e.target.value, medicalHistory)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                        />
                                    </div>
                                    </div>

                                    {/* Remove button */}
                                    {medicalHistory.length > 1 && (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() => removeItem(setMedicalHistory, index, medicalHistory)}
                                    >
                                        Remove
                                    </button>
                                    )}
                                </div>
                                ))}

                                {/*Add button */}
                                <div className="flex justify-center mb-5">
                                <button
                                    type="button"
                                    className="bg-secondary text-white px-4 py-2 rounded"
                                    onClick={() =>
                                    addItem(setMedicalHistory, {
                                        conditionName: "",
                                        diagnosedDate: "",
                                        conditionType: "",
                                        severity: "",
                                        conditionStatus: "",
                                        resolutionDate: "",
                                    })
                                    }
                                >
                                    + Add Condition
                                </button>
                                </div>
                                </div>

                            {/* ALLERGIES */}
                            <div className="allergy-info-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                <Dna className="text-secondary h-5" />
                                <h3 className="text-2xl font-semibold text-primary">Allergies</h3>
                                </div>
                                <p className="text-sm text-gray-500"><em>Type “None” if not applicable</em></p>
                            </div>
                            {allergies.map((a, index) => (
                            <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-5 mb-5 mx-10"
                            >
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-5 mb-3">
                                <div className="flex flex-col">
                                    <label htmlFor={`allergyName-${index}`} className="font-semibold text-sm text-gray-700">
                                    Allergy Name
                                    </label>
                                    <input
                                    id={`allergyName-${index}`}
                                    type="text"
                                    placeholder="Allergy Name"
                                    value={a.allergyName}
                                    onChange={(e) =>
                                        updateItem(setAllergies, index, "allergyName", e.target.value, allergies)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`allergyType-${index}`} className="font-semibold text-sm text-gray-700">
                                    Allergy Type
                                    </label>
                                    <input
                                    id={`allergyType-${index}`}
                                    type="text"
                                    placeholder="Type"
                                    value={a.allergyType}
                                    onChange={(e) =>
                                        updateItem(setAllergies, index, "allergyType", e.target.value, allergies)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`allergyReaction-${index}`} className="font-semibold text-sm text-gray-700">
                                    Reaction
                                    </label>
                                    <input
                                    id={`allergyReaction-${index}`}
                                    type="text"
                                    placeholder="Reaction"
                                    value={a.allergyReaction}
                                    onChange={(e) =>
                                        updateItem(setAllergies, index, "allergyReaction", e.target.value, allergies)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`allergySeverity-${index}`} className="font-semibold text-sm text-gray-700">
                                    Severity
                                    </label>
                                    <input
                                    id={`allergySeverity-${index}`}
                                    type="text"
                                    placeholder="Severity"
                                    value={a.severity}
                                    onChange={(e) =>
                                        updateItem(setAllergies, index, "severity", e.target.value, allergies)
                                    }
                                    className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                </div>
                                </div>

                                {/* Remove button */}
                                {allergies.length > 1 && (
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => removeItem(setAllergies, index, allergies)}
                                >
                                    Remove
                                </button>
                                )}
                            </div>
                            ))}

                            {/* Add button */}
                            <div className="flex justify-center mb-5">
                            <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded"
                                onClick={() =>
                                addItem(setAllergies, {
                                    allergyName: "",
                                    allergyType: "",
                                    allergyReaction: "",
                                    severity: "",
                                })
                                }
                            >
                                + Add Allergy
                            </button>
                            </div>
                            </div>

                            {/* LAB RESULTS */}
                          <div className="lab-results-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                <Activity className="text-secondary h-5" />
                                <h3 className="text-2xl font-semibold text-primary">Lab Results</h3>
                                </div>
                            </div>

                            {labResults.map((l, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-5 mb-5 mx-10"
                                >
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-5 mb-3">
                                    <div className="flex flex-col">
                                    <label htmlFor={`testName-${index}`} className="font-semibold text-sm text-gray-700">
                                        Test Name
                                    </label>
                                    <input
                                        id={`testName-${index}`}
                                        type="text"
                                        placeholder="Test Name"
                                        value={l.testName}
                                        onChange={(e) =>
                                        updateItem(setLabResults, index, "testName", e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`testDate-${index}`} className="font-semibold text-sm text-gray-700">
                                        Test Date
                                    </label>
                                    <input
                                        id={`testDate-${index}`}
                                        type="date"
                                        value={l.testDate}
                                        onChange={(e) =>
                                        updateItem(setLabResults, index, "testDate", e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`testResult-${index}`} className="font-semibold text-sm text-gray-700">
                                        Result
                                    </label>
                                    <input
                                        id={`testResult-${index}`}
                                        type="text"
                                        placeholder="Result"
                                        value={l.testResult}
                                        onChange={(e) =>
                                        updateItem(setLabResults, index, "testResult", e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`referenceRange-${index}`} className="font-semibold text-sm text-gray-700">
                                        Reference Range
                                    </label>
                                    <input
                                        id={`referenceRange-${index}`}
                                        type="text"
                                        placeholder="Reference Range"
                                        value={l.referenceRange}
                                        onChange={(e) =>
                                        updateItem(setLabResults, index, "referenceRange", e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`testFlag-${index}`} className="font-semibold text-sm text-gray-700">
                                        Flag
                                    </label>
                                    <input
                                        id={`testFlag-${index}`}
                                        type="text"
                                        placeholder="Flag"
                                        value={l.testFlag}
                                        onChange={(e) =>
                                        updateItem(setLabResults, index, "testFlag", e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>
                                </div>

                                {/* Remove Button */}
                                {labResults.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => removeItem(setLabResults, index, labResults)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            {/* Add Button */}
                            <div className="flex justify-center mb-5">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded"
                                onClick={() =>
                                    addItem(setLabResults, {
                                    testName: "",
                                    testDate: "",
                                    testResult: "",
                                    referenceRange: "",
                                    testFlag: "",
                                    })
                                }
                                >
                                + Add Test
                                </button>
                            </div>
                            </div>


                            {/* PRESCRIPTIONS */}
                            <div className="prescriptions-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                <Save className="text-secondary h-5" />
                                <h3 className="text-2xl font-semibold text-primary">Prescriptions</h3>
                                </div>
                            </div>

                            {prescriptions.map((p, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-5 mb-5 mx-10"
                                >
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-5 mb-3">
                                    <div className="flex flex-col">
                                    <label htmlFor={`prescMedName-${index}`} className="font-semibold text-sm text-gray-700">
                                        Medication Name
                                    </label>
                                    <input
                                        id={`prescMedName-${index}`}
                                        type="text"
                                        placeholder="Medication Name"
                                        value={p.medicationName}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "medicationName", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`prescDosage-${index}`} className="font-semibold text-sm text-gray-700">
                                        Dosage
                                    </label>
                                    <input
                                        id={`prescDosage-${index}`}
                                        type="text"
                                        placeholder="Dosage"
                                        value={p.dosage}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "dosage", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`prescQuantity-${index}`} className="font-semibold text-sm text-gray-700">
                                        Quantity
                                    </label>
                                    <input
                                        id={`prescQuantity-${index}`}
                                        type="text"
                                        placeholder="Quantity"
                                        value={p.quantity}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "quantity", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`prescfrequency-${index}`} className="font-semibold text-sm text-gray-700">
                                        Frequency
                                    </label>
                                    <input
                                        id={`prescfrequency-${index}`}
                                        type="text"
                                        placeholder="frequency"
                                        value={p.frequency}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "frequency", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`datePrescribed-${index}`} className="font-semibold text-sm text-gray-700">
                                        Date Prescribed
                                    </label>
                                    <input
                                        id={`datePrescribed-${index}`}
                                        type="date"
                                        value={p.datePrescribed}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "datePrescribed", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label htmlFor={`prescribeBy-${index}`} className="font-semibold text-sm text-gray-700">
                                        Prescribed By
                                    </label>
                                    <input
                                        id={`prescribeBy-${index}`}
                                        type="text"
                                        placeholder="Prescribing Provider"
                                        value={p.prescribeBy}
                                        onChange={(e) =>
                                        updateItem(setPrescriptions, index, "prescribeBy", e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-500 outline-primary"
                                    />
                                    </div>
                                </div>

                                {/* Remove Button */}
                                {prescriptions.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => removeItem(setPrescriptions, index, prescriptions)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            {/* Add Button */}
                            <div className="flex justify-center mb-5">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded"
                                onClick={() =>
                                    addItem(setPrescriptions, {
                                    medicationName: "",
                                    dosage: "",
                                    quantity: "",
                                    datePrescribed: "",
                                    prescribeBy: "",
                                    })
                                }
                                >
                                + Add Prescription
                                </button>
                            </div>
                            </div>


                            {/* BUTTONS */}
                            <div className="button-container flex justify-center gap-5 items-center m-5">
                            <button
                                type="button"
                                className="bg-gray-400 rounded px-6 py-2 text-white flex flex-cols items-center gap-2"
                                onClick={() => prevStep()}
                            >
                                <ArrowBigLeft /> Back
                            </button>

                            <button
                                type="submit"
                                onClick={handleSave}
                                className="bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2"
                            >
                                Save Record <Save />
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
