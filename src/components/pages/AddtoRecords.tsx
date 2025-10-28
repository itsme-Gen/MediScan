import React, { useEffect, useState } from 'react'
import Appbar from '../props/Appbar'
import { 
    Activity, ArrowBigLeft, ArrowBigRight, Bot, CircleUser, Dna, Heart,
    Home,
    NotepadText,
    Phone, Pill, Save, Scan, Stethoscope, User, UserPlus
} from 'lucide-react'
import Sidebar from '../props/Sidebar'
import { registerPatient } from '../api/registePatient'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const AddtoRecords = () => {
    const [formData, setFormData] = useState<any>({})
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const data = localStorage.getItem("saveFormData")
        if (data) setFormData(JSON.parse(data))
    }, [])

    const [step, setStep] = useState<number>(1)
    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

  // clear saved data and navigate
  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;


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
            const response = await registerPatient(saveData);
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
        <div className='addToRecords flex flex-col lg:flex-row h-screen'>

              {/* Sidebar */}
            <div className="sidebar hidden lg:block">
                <Sidebar/>
            </div>

            <div className="main-content w-[100%] flex-1 flex flex-col lg:ml-70 overflow-y-auto">
                <Appbar
                    iconTitle={UserPlus}
                    title='Add to Records'
                    icon={CircleUser}
                />

                <div className="medical-info p-8">
                   <div className="title text-center sm:text-left px-4 sm:px-6 md:px-10 py-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
                            Medical Information
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-secondary mt-2">
                            Complete patient medical profile for{" "}
                            <span className="font-medium">
                            {formData.firstName} {formData.middleName} {formData.lastName}
                            </span>
                        </p>
                    </div>


                   <div className="patient-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
                        {/* Title Section */}
                        <div className="title flex flex-col sm:flex-row gap-2 items-center sm:items-start sm:justify-start m-4 sm:m-6">
                            <User className="text-secondary w-6 h-6 sm:w-7 sm:h-7" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-primary text-center sm:text-left">
                            Patient Information
                            </h3>
                        </div>

                        {/* Patient Info Grid */}
                        <div className="patient-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-10 pb-8">
                            <div className="full-name">
                            <h3 className="font-semibold text-base sm:text-lg">Full Name</h3>
                            <p className="text-sm sm:text-base">
                                {formData.firstName} {formData.middleName} {formData.lastName}
                            </p>
                            </div>

                            <div className="birthDate">
                            <h3 className="font-semibold text-base sm:text-lg">Birth Date</h3>
                            <p className="text-sm sm:text-base">{formData.birthDate}</p>
                            </div>

                            <div className="gender">
                            <h3 className="font-semibold text-base sm:text-lg">Gender</h3>
                            <p className="text-sm sm:text-base">{formData.gender}</p>
                            </div>

                            <div className="idNumber">
                            <h3 className="font-semibold text-base sm:text-lg">ID Number</h3>
                            <p className="text-sm sm:text-base">{formData.idNumber}</p>
                            </div>
                        </div>
                    </div>


                    <form className=''>
                        {step === 1 && (
                            <>
                            {/* CONTACT INFORMATION */}
                            <div className="contact-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
                            {/* Title */}
                            <div className="title flex flex-col gap-1 m-4 sm:m-6">
                                <div className="main-text flex items-center gap-2">
                                <Phone className="text-secondary h-5 w-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                                    Contact Information
                                </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                <em>Type N/A if not applicable</em>
                                </p>
                            </div>

                            {/* Inputs */}
                            <div className="contact-info flex justify-center items-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] mb-10">
                                <div className="flex flex-col">
                                    <label htmlFor="emailAddress" className="font-semibold text-sm text-gray-700">
                                    Email Address
                                    </label>
                                    <input
                                    id="emailAddress"
                                    type="email"
                                    placeholder="Email Address"
                                    value={contact.emailAddress}
                                    onChange={(e) => setContact({ ...contact, emailAddress: e.target.value })}
                                    className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="homeAddress" className="font-semibold text-sm text-gray-700">
                                    Home Address
                                    </label>
                                    <input
                                    id="homeAddress"
                                    type="text"
                                    placeholder="Home Address"
                                    value={contact.homeAddress}
                                    onChange={(e) => setContact({ ...contact, homeAddress: e.target.value })}
                                    className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="contactNumber" className="font-semibold text-sm text-gray-700">
                                    Contact Number
                                    </label>
                                    <input
                                    id="contactNumber"
                                    type="number"
                                    placeholder="Contact Number"
                                    value={contact.contactNumber}
                                    onChange={(e) => setContact({ ...contact, contactNumber: e.target.value })}
                                    className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="emergencyContact" className="font-semibold text-sm text-gray-700">
                                    Emergency Contact
                                    </label>
                                    <input
                                    id="emergencyContact"
                                    type="number"
                                    placeholder="Emergency Contact"
                                    value={contact.emergencyContact}
                                    onChange={(e) => setContact({ ...contact, emergencyContact: e.target.value })}
                                    className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
                                    />
                                </div>
                                </div>
                            </div>
                            </div>

                            {/* REASON FOR VISIT */}
                            <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg shadow-sm">
                            <div className="title flex flex-col gap-1 m-4 sm:m-6">
                                <div className="main-text flex items-center gap-2">
                                <Stethoscope className="text-secondary h-5 w-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                                    Reason for Visit
                                </h3>
                                </div>
                            </div>
                            <div className="text-area px-6 sm:px-10 mb-6">
                                <label
                                htmlFor="reasonForVisit"
                                className="font-semibold text-sm text-gray-700"
                                >
                                Reason
                                </label>
                                <textarea
                                id="reasonForVisit"
                                value={reasonForVisit}
                                onChange={(e) => setReasonForVisit(e.target.value)}
                                placeholder="Type something here..."
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                />
                            </div>
                            </div>

                            {/* VITAL SIGNS */}
                            <div className="vital-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
                            <div className="title flex flex-col gap-1 m-4 sm:m-6">
                                <div className="main-text flex items-center gap-2">
                                <Activity className="text-secondary h-5 w-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                                    Vital Signs
                                </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                <em>All fields are required*</em>
                                </p>
                            </div>

                            <div className="vital-info flex justify-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mb-10">
                                <div className="flex flex-col">
                                    <label htmlFor="bodyTemperature" className="font-semibold text-sm text-gray-700">
                                    Body Temperature
                                    </label>
                                    <input
                                    id="bodyTemperature"
                                    type="text"
                                    placeholder="Body Temperature"
                                    value={vitalSigns.bodyTemperature}
                                    onChange={(e) => setVitalSigns({ ...vitalSigns, bodyTemperature: e.target.value })}
                                    className="p-2 rounded border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="heartPulse" className="font-semibold text-sm text-gray-700">
                                    Heart Pulse
                                    </label>
                                    <input
                                    id="heartPulse"
                                    type="text"
                                    placeholder="Heart Pulse"
                                    value={vitalSigns.heartPulse}
                                    onChange={(e) => setVitalSigns({ ...vitalSigns, heartPulse: e.target.value })}
                                    className="p-2 rounded border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="respiratoryRate" className="font-semibold text-sm text-gray-700">
                                    Respiratory Rate
                                    </label>
                                    <input
                                    id="respiratoryRate"
                                    type="text"
                                    placeholder="Respiratory Rate"
                                    value={vitalSigns.respiratoryRate}
                                    onChange={(e) => setVitalSigns({ ...vitalSigns, respiratoryRate: e.target.value })}
                                    className="p-2 rounded border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="bloodPressure" className="font-semibold text-sm text-gray-700">
                                    Blood Pressure
                                    </label>
                                    <input
                                    id="bloodPressure"
                                    type="text"
                                    placeholder="Blood Pressure"
                                    value={vitalSigns.bloodPressure}
                                    onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })}
                                    className="p-2 rounded border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                                    />
                                </div>
                                </div>
                            </div>
                            </div>

                            {/* NEXT BUTTON */}
                            <div className="button-container flex justify-center items-center my-8 mb-20">
                            <button
                                className="bg-primary hover:bg-primary/90 transition-all duration-300 rounded px-6 py-2 text-white flex items-center gap-2 text-sm sm:text-base"
                                onClick={(e) => {
                                e.preventDefault();
                                nextStep();
                                }}
                            >
                                Next
                                <ArrowBigRight className="w-4 h-4" />
                            </button>
                            </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                        {/* MEDICATIONS */}
                        <div className="medication-info-card border border-gray-300 mt-10 rounded-lg w-full">
                            <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
                                <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
                                <Pill className="text-secondary h-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                                    Medications
                                </h3>
                                </div>
                                <p className="text-sm text-gray-500">
                                <em>All current and past medications</em>
                                </p>
                            </div>

                            {medications.map((m, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
                                >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                                    <div className="flex flex-col">
                                    <label
                                        htmlFor={`medicationName-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                    >
                                        Medication Name
                                    </label>
                                    <input
                                        id={`medicationName-${index}`}
                                        type="text"
                                        placeholder="Medication Name"
                                        value={m.medicationName}
                                        onChange={(e) =>
                                        updateItem(
                                            setMedications,
                                            index,
                                            "medicationName",
                                            e.target.value,
                                            medications
                                        )
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label
                                        htmlFor={`dateStarted-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                    >
                                        Date Started
                                    </label>
                                    <input
                                        id={`dateStarted-${index}`}
                                        type="date"
                                        value={m.dateStarted}
                                        onChange={(e) =>
                                        updateItem(
                                            setMedications,
                                            index,
                                            "dateStarted",
                                            e.target.value,
                                            medications
                                        )
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label
                                        htmlFor={`dosage-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                    >
                                        Dosage
                                    </label>
                                    <input
                                        id={`dosage-${index}`}
                                        type="text"
                                        placeholder="Dosage"
                                        value={m.dosage}
                                        onChange={(e) =>
                                        updateItem(
                                            setMedications,
                                            index,
                                            "dosage",
                                            e.target.value,
                                            medications
                                        )
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                    />
                                    </div>

                                    <div className="flex flex-col">
                                    <label
                                        htmlFor={`frequency-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                    >
                                        Frequency
                                    </label>
                                    <input
                                        id={`frequency-${index}`}
                                        type="text"
                                        placeholder="Frequency"
                                        value={m.frequency}
                                        onChange={(e) =>
                                        updateItem(
                                            setMedications,
                                            index,
                                            "frequency",
                                            e.target.value,
                                            medications
                                        )
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                    />
                                    </div>
                                </div>

                                {/* Remove button */}
                                {medications.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                                    onClick={() => removeItem(setMedications, index, medications)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            {/* Add button */}
                            <div className="flex justify-center mb-6">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
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
                            <div className="medical-history-card border border-gray-300 mt-10 rounded-lg w-full">
                            <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
                                <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
                                <Heart className="text-secondary h-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                                    Medical History
                                </h3>
                                </div>
                                <p className="text-sm text-gray-500">
                                <em>Past medical conditions</em>
                                </p>
                            </div>

                            {medicalHistory.map((h, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
                                >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                                    {[
                                    { id: "conditionName", label: "Condition Name", type: "text" },
                                    { id: "diagnosedDate", label: "Diagnosed Date", type: "date" },
                                    { id: "conditionType", label: "Condition Type", type: "text" },
                                    { id: "severity", label: "Severity", type: "text" },
                                    { id: "conditionStatus", label: "Status", type: "text" },
                                    { id: "resolutionDate", label: "Resolution Date", type: "date" },
                                    ].map((field) => (
                                    <div className="flex flex-col" key={field.id}>
                                        <label
                                        htmlFor={`${field.id}-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                        >
                                        {field.label}
                                        </label>
                                        <input
                                        id={`${field.id}-${index}`}
                                        type={field.type}
                                        placeholder={field.label}
                                        value={h[field.id as keyof typeof h]}
                                        onChange={(e) =>
                                            updateItem(
                                            setMedicalHistory,
                                            index,
                                            field.id,
                                            e.target.value,
                                            medicalHistory
                                            )
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                        />
                                    </div>
                                    ))}
                                </div>

                                {/* Remove button */}
                                {medicalHistory.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                                    onClick={() => removeItem(setMedicalHistory, index, medicalHistory)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            {/* Add button */}
                            <div className="flex justify-center mb-6">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
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
                            <div className="allergy-info-card border border-gray-300 mt-10 rounded-lg w-full">
                            <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
                                <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
                                <Dna className="text-secondary h-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Allergies</h3>
                                </div>
                                <p className="text-sm text-gray-500">
                                <em>Type “None” if not applicable</em>
                                </p>
                            </div>

                            {allergies.map((a, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
                                >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                                    {[
                                    { id: "allergyName", label: "Allergy Name", type: "text" },
                                    { id: "allergyType", label: "Allergy Type", type: "text" },
                                    { id: "allergyReaction", label: "Reaction", type: "text" },
                                    { id: "severity", label: "Severity", type: "text" },
                                    ].map((field) => (
                                    <div className="flex flex-col" key={field.id}>
                                        <label
                                        htmlFor={`${field.id}-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                        >
                                        {field.label}
                                        </label>
                                        <input
                                        id={`${field.id}-${index}`}
                                        type={field.type}
                                        placeholder={field.label}
                                        value={a[field.id as keyof typeof a]}
                                        onChange={(e) =>
                                            updateItem(setAllergies, index, field.id, e.target.value, allergies)
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                        />
                                    </div>
                                    ))}
                                </div>

                                {allergies.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                                    onClick={() => removeItem(setAllergies, index, allergies)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            <div className="flex justify-center mb-6">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
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
                            <div className="lab-results-card border border-gray-300 mt-10 rounded-lg w-full">
                            <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
                                <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
                                <Activity className="text-secondary h-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Lab Results</h3>
                                </div>
                            </div>

                            {labResults.map((l, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
                                >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                                    {[
                                    { id: "testName", label: "Test Name", type: "text" },
                                    { id: "testDate", label: "Test Date", type: "date" },
                                    { id: "testResult", label: "Result", type: "text" },
                                    { id: "referenceRange", label: "Reference Range", type: "text" },
                                    { id: "testFlag", label: "Flag", type: "text" },
                                    ].map((field) => (
                                    <div className="flex flex-col" key={field.id}>
                                        <label
                                        htmlFor={`${field.id}-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                        >
                                        {field.label}
                                        </label>
                                        <input
                                        id={`${field.id}-${index}`}
                                        type={field.type}
                                        placeholder={field.label}
                                        value={l[field.id as keyof typeof l]}
                                        onChange={(e) =>
                                            updateItem(setLabResults, index, field.id, e.target.value, labResults)
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                        />
                                    </div>
                                    ))}
                                </div>

                                {labResults.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                                    onClick={() => removeItem(setLabResults, index, labResults)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            <div className="flex justify-center mb-6">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
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
                            <div className="prescriptions-card border border-gray-300 mt-10 rounded-lg w-full">
                            <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
                                <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
                                <Save className="text-secondary h-5" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Prescriptions</h3>
                                </div>
                            </div>

                            {prescriptions.map((p, index) => (
                                <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
                                >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                                    {[
                                    { id: "medicationName", label: "Medication Name", type: "text" },
                                    { id: "dosage", label: "Dosage", type: "text" },
                                    { id: "quantity", label: "Quantity", type: "text" },
                                    { id: "frequency", label: "Frequency", type: "text" },
                                    { id: "datePrescribed", label: "Date Prescribed", type: "date" },
                                    { id: "prescribeBy", label: "Prescribed By", type: "text" },
                                    ].map((field) => (
                                    <div className="flex flex-col" key={field.id}>
                                        <label
                                        htmlFor={`${field.id}-${index}`}
                                        className="font-semibold text-sm text-gray-700"
                                        >
                                        {field.label}
                                        </label>
                                        <input
                                        id={`${field.id}-${index}`}
                                        type={field.type}
                                        placeholder={field.label}
                                        value={p[field.id as keyof typeof p]}
                                        onChange={(e) =>
                                            updateItem(setPrescriptions, index, field.id, e.target.value, prescriptions)
                                        }
                                        className="p-2 rounded border border-gray-400 outline-primary"
                                        />
                                    </div>
                                    ))}
                                </div>

                                {prescriptions.length > 1 && (
                                    <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                                    onClick={() => removeItem(setPrescriptions, index, prescriptions)}
                                    >
                                    Remove
                                    </button>
                                )}
                                </div>
                            ))}

                            <div className="flex justify-center mb-6">
                                <button
                                type="button"
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
                                onClick={() =>
                                    addItem(setPrescriptions, {
                                    medicationName: "",
                                    dosage: "",
                                    quantity: "",
                                    frequency: "",
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
                            <div className="button-container flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center m-5 mb-20">
                            <button
                                type="button"
                                className="bg-gray-400 rounded px-6 py-2 text-white flex items-center gap-2 w-full sm:w-auto justify-center"
                                onClick={() => prevStep()}
                            >
                                <ArrowBigLeft /> Back
                            </button>

                            <button
                                type="submit"
                                onClick={handleSave}
                                className="bg-primary rounded px-6 py-2 text-white flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                Save Record <Save />
                            </button>
                            </div>

                        </>
                        )}


                      
                    </form>
                </div>
            </div>

             {/*Mobile Navigation*/}
                  <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
                    <button
                      onClick={() => clearStorageAndNavigate('/dashboard')}
                      className={`flex flex-col items-center transition ${
                        isActive('/dashboard') ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <Home className="w-6 h-6" />
                      <span className="text-xs font-medium">Dashboard</span>
                    </button>
            
                    <button
                      onClick={() => clearStorageAndNavigate('/scanid')}
                      className={`flex flex-col items-center transition ${
                        isActive('/scanid') ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <Scan className="w-6 h-6" />
                      <span className="text-xs font-medium">Scan ID</span>
                    </button>
            
                    <button
                      onClick={() => clearStorageAndNavigate('/records')}
                      className={`flex flex-col items-center transition ${
                        isActive('/records') ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <NotepadText className="w-6 h-6" />
                      <span className="text-xs font-medium">Records</span>
                    </button>
            
                    <button
                      onClick={() => clearStorageAndNavigate('/chatassistant')}
                      className={`flex flex-col items-center transition ${
                        isActive('/chatassistant') ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <Bot className="w-6 h-6" />
                      <span className="text-xs font-medium">Assistant</span>
                    </button>
                  </div>
            </div>
    )
}

export default AddtoRecords
