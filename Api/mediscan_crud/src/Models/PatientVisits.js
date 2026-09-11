const mongoose = require('mongoose');

const PatientVisitsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients',
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorRole: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: false
  },
  visitReason: {
    type: String,
    required: false
  },
  visitDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  recordsSaved: {
    vitalSigns: { type: Boolean, default: false },
    medications: { type: Boolean, default: false },
    medicalHistory: { type: Boolean, default: false },
    allergies: { type: Boolean, default: false },
    labResults: { type: Boolean, default: false },
    prescriptions: { type: Boolean, default: false }
  },
  notes: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const PatientVisits = mongoose.model('patient_visits', PatientVisitsSchema);
module.exports = PatientVisits;
