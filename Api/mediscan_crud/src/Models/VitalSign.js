const mongoose = require('mongoose');

const vitalSignSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'patients',
      required: true,
    },
    body_temperature: { type: String, required: true },
    heart_pulse: { type: String, required: true },
    respiratory_rate: { type: String, required: true },
    blood_pressure: { type: String, required: true },
    date_recorded: { type: Date, default: Date.now }, 
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('vitalsigns', vitalSignSchema);
