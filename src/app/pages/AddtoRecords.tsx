import React, { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import {
  ArrowBigLeft,
  ArrowBigRight,
  Bot,
  CircleUser,
  Home,
  NotepadText,
  Save as SaveIcon,
  Scan,
  User,
  UserPlus,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { registerPatient } from '../api/RegisterPatient';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import ContactInfoForm from '../components/records/ContactInfoForm';
import ReasonForVisitForm from '../components/records/ReasonForVisitForm';
import VitalSignsForm from '../components/records/VitalSignsForm';
import MedicationsForm from '../components/records/MedicationsForm';
import MedicalHistoryForm from '../components/records/MedicalHistoryForm';
import AllergiesForm from '../components/records/AllergiesForm';
import LabResultsForm from '../components/records/LabResultsForm';
import PrescriptionsForm from '../components/records/PrescriptionsForm';

import type {
  Allergy,
  ContactInfo,
  LabResult,
  MedicalHistoryItem,
  Medication,
  Prescription,
  VitalSigns,
  PatientIdentity,
} from '../types/records';

const conditionTypes = [
  'Acute',
  'Chronic',
  'Subacute',
  'Congenital',
  'Genetic',
  'Hereditary',
  'Infectious',
  'Autoimmune',
  'Inflammatory',
  'Degenerative',
  'Neoplastic (Tumor/Cancer)',
  'Metabolic',
  'Nutritional Deficiency',
  'Occupational',
  'Environmental',
  'Mental/Psychiatric',
  'Trauma-Related',
  'Iatrogenic',
  'Idiopathic (Unknown cause)',
];

const conditionStatusOptions = [
  'Active',
  'Resolved',
  'Ongoing',
  'Recurring',
  'Controlled',
  'Worsening',
  'Improving',
  'Unknown',
];

const severityOptions = ['Mild', 'Moderate', 'Severe', 'Critical'];
const flagOptions = ['High', 'Low', 'Normal'];

const makeListHandlers = <T extends Record<string, string>>(
  setter: React.Dispatch<React.SetStateAction<T[]>>,
) => ({
  add: (template: T) => setter((prev) => [...prev, template]),
  update: (index: number, field: keyof T, value: string) =>
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))),
  remove: (index: number) => setter((prev) => prev.filter((_, i) => i !== index)),
});

const AddtoRecords = () => {
  const [formData, setFormData] = useState<PatientIdentity>({
    firstName: '',
    middleName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    gender: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('saveFormData');
    if (data) {
      try {
        const parsed = JSON.parse(data) as Partial<PatientIdentity>;
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Invalid saveFormData in storage', error);
      }
    }
  }, []);

  const [step, setStep] = useState<number>(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem('saveFormData');
    localStorage.removeItem('saveData');
    localStorage.removeItem('saveImage');
    localStorage.removeItem('medicalHistory');
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const [contact, setContact] = useState<ContactInfo>({
    emailAddress: '',
    homeAddress: '',
    contactNumber: '',
    emergencyContact: '',
  });
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bodyTemperature: '',
    heartPulse: '',
    respiratoryRate: '',
    bloodPressure: '',
  });
  const [medications, setMedications] = useState<Medication[]>([
    { medicationName: '', dateStarted: '', dosage: '', frequency: '' },
  ]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryItem[]>([
    { conditionName: '', diagnosedDate: '', conditionType: '', severity: '', conditionStatus: '', resolutionDate: '' },
  ]);
  const [allergies, setAllergies] = useState<Allergy[]>([
    { allergyName: '', allergyType: '', allergyReaction: '', severity: '' },
  ]);
  const [labResults, setLabResults] = useState<LabResult[]>([
    { testName: '', testDate: '', testResult: '', referenceRange: '', testFlag: '' },
  ]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { medicationName: '', dosage: '', quantity: '', frequency: '', datePrescribed: '', prescribeBy: '' },
  ]);

  const handleContactChange = (updates: Partial<ContactInfo>) => setContact((prev) => ({ ...prev, ...updates }));
  const handleVitalChange = (updates: Partial<VitalSigns>) => setVitalSigns((prev) => ({ ...prev, ...updates }));

  const medicationHandlers = makeListHandlers<Medication>(setMedications);
  const historyHandlers = makeListHandlers<MedicalHistoryItem>(setMedicalHistory);
  const allergyHandlers = makeListHandlers<Allergy>(setAllergies);
  const labHandlers = makeListHandlers<LabResult>(setLabResults);
  const prescriptionHandlers = makeListHandlers<Prescription>(setPrescriptions);

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
        blood_pressure: vitalSigns.bloodPressure,
      },
      medications: medications.map((m) => ({
        medication_name: m.medicationName,
        start_date: m.dateStarted,
        dosage: m.dosage,
        frequency: m.frequency,
      })),
      medicalHistory: medicalHistory.map((mh) => ({
        condition_name: mh.conditionName,
        diagnosis_date: mh.diagnosedDate,
        condition_type: mh.conditionType,
        severity: mh.severity,
        status: mh.conditionStatus,
        resolution_date: mh.resolutionDate,
      })),
      allergies: allergies.map((a) => ({
        allergen_name: a.allergyName,
        allergy_type: a.allergyType,
        reaction: a.allergyReaction,
        severity: a.severity,
      })),
      labResults: labResults.map((lr) => ({
        test_name: lr.testName,
        test_date: lr.testDate,
        test_result: lr.testResult,
        reference_range: lr.referenceRange,
        abnormal_flag: lr.testFlag,
      })),
      prescriptions: prescriptions.map((p) => ({
        medication_name: p.medicationName,
        dosage: p.dosage,
        quantity: p.quantity,
        date_prescribed: p.datePrescribed,
        prescribing_provider: p.prescribeBy,
        frequency: p.frequency,
      })),
    };

    try {
      const response = await registerPatient(saveData);
      console.log('Response:', response.data);

      localStorage.removeItem('saveFormData');
      localStorage.removeItem('saveData');
      localStorage.removeItem('saveImage');
      localStorage.removeItem('medicalHistory');
      toast.dismiss();
      toast.success('Record saved successfully!');
      navigate('/dashboard');

      setContact({ emailAddress: '', homeAddress: '', contactNumber: '', emergencyContact: '' });
      setReasonForVisit('');
      setVitalSigns({ bodyTemperature: '', heartPulse: '', respiratoryRate: '', bloodPressure: '' });
      setMedications([{ medicationName: '', dateStarted: '', dosage: '', frequency: '' }]);
      setMedicalHistory([
        { conditionName: '', diagnosedDate: '', conditionType: '', severity: '', conditionStatus: '', resolutionDate: '' },
      ]);
      setAllergies([{ allergyName: '', allergyType: '', allergyReaction: '', severity: '' }]);
      setLabResults([{ testName: '', testDate: '', testResult: '', referenceRange: '', testFlag: '' }]);
      setPrescriptions([
        { medicationName: '', dosage: '', quantity: '', frequency: '', datePrescribed: '', prescribeBy: '' },
      ]);
      setStep(1);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save record. Check server logs for details.');
    }
  };

  return (
    <div className="addToRecords flex flex-col lg:flex-row h-screen">
      <div className="sidebar hidden lg:block">
        <Sidebar />
      </div>

      <div className="main-content w-[100%] flex-1 flex flex-col lg:ml-70 overflow-y-auto">
        <Appbar iconTitle={UserPlus} title="Add to Records" icon={CircleUser} />

        <div className="medical-info p-8">
          <div className="title text-center sm:text-left px-4 sm:px-6 md:px-10 py-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">Medical Information</h1>
            <p className="text-sm sm:text-base md:text-lg text-secondary mt-2">
              Complete patient medical profile for{' '}
              <span className="font-medium">
                {formData.firstName} {formData.middleName} {formData.lastName}
              </span>
            </p>
          </div>

          <div className="patient-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
            <div className="title flex flex-col sm:flex-row gap-2 items-center sm:items-start sm:justify-start m-4 sm:m-6">
              <User className="text-secondary w-6 h-6 sm:w-7 sm:h-7" />
              <h3 className="text-xl sm:text-2xl font-semibold text-primary text-center sm:text-left">
                Patient Information
              </h3>
            </div>

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

          <form>
            {step === 1 && (
              <>
                <ContactInfoForm contact={contact} onChange={handleContactChange} />
                <ReasonForVisitForm reasonForVisit={reasonForVisit} onChange={setReasonForVisit} />
                <VitalSignsForm vitalSigns={vitalSigns} onChange={handleVitalChange} />

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
                <MedicationsForm
                  medications={medications}
                  onAdd={() => medicationHandlers.add({ medicationName: '', dateStarted: '', dosage: '', frequency: '' })}
                  onChange={(index, field, value) => medicationHandlers.update(index, field, value)}
                  onRemove={(index) => medicationHandlers.remove(index)}
                />

                <MedicalHistoryForm
                  medicalHistory={medicalHistory}
                  conditionTypes={conditionTypes}
                  conditionStatusOptions={conditionStatusOptions}
                  severityOptions={severityOptions}
                  onAdd={() =>
                    historyHandlers.add({
                      conditionName: '',
                      diagnosedDate: '',
                      conditionType: '',
                      severity: '',
                      conditionStatus: '',
                      resolutionDate: '',
                    })
                  }
                  onChange={(index, field, value) => historyHandlers.update(index, field, value)}
                  onRemove={(index) => historyHandlers.remove(index)}
                />

                <AllergiesForm
                  allergies={allergies}
                  onAdd={() =>
                    allergyHandlers.add({ allergyName: '', allergyType: '', allergyReaction: '', severity: '' })
                  }
                  onChange={(index, field, value) => allergyHandlers.update(index, field, value)}
                  onRemove={(index) => allergyHandlers.remove(index)}
                />

                <LabResultsForm
                  labResults={labResults}
                  flagOptions={flagOptions}
                  onAdd={() =>
                    labHandlers.add({
                      testName: '',
                      testDate: '',
                      testResult: '',
                      referenceRange: '',
                      testFlag: '',
                    })
                  }
                  onChange={(index, field, value) => labHandlers.update(index, field, value)}
                  onRemove={(index) => labHandlers.remove(index)}
                />

                <PrescriptionsForm
                  prescriptions={prescriptions}
                  onAdd={() =>
                    prescriptionHandlers.add({
                      medicationName: '',
                      dosage: '',
                      quantity: '',
                      frequency: '',
                      datePrescribed: '',
                      prescribeBy: '',
                    })
                  }
                  onChange={(index, field, value) => prescriptionHandlers.update(index, field, value)}
                  onRemove={(index) => prescriptionHandlers.remove(index)}
                />

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
                    Save Record <SaveIcon />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

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
  );
};

export default AddtoRecords;
