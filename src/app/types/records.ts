export type ContactInfo = {
  emailAddress: string;
  homeAddress: string;
  contactNumber: string;
  emergencyContact: string;
};

export type VitalSigns = {
  bodyTemperature: string;
  heartPulse: string;
  respiratoryRate: string;
  bloodPressure: string;
};

export type Medication = {
  medicationName: string;
  dateStarted: string;
  dosage: string;
  frequency: string;
};

export type MedicalHistoryItem = {
  conditionName: string;
  diagnosedDate: string;
  conditionType: string;
  severity: string;
  conditionStatus: string;
  resolutionDate: string;
};

export type Allergy = {
  allergyName: string;
  allergyType: string;
  allergyReaction: string;
  severity: string;
};

export type LabResult = {
  testName: string;
  testDate: string;
  testResult: string;
  referenceRange: string;
  testFlag: string;
};

export type Prescription = {
  medicationName: string;
  dosage: string;
  quantity: string;
  frequency: string;
  datePrescribed: string;
  prescribeBy: string;
};

// Basic identity details captured from ID/OCR flows
export type PatientIdentity = {
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  gender: string;
};
