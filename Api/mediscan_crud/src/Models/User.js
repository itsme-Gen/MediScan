const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  licenseNumber: { 
    type: Number, 
    required: true,
    validate: { validator: Number.isInteger, message: '{VALUE} must be an integer' }
  },
  hospitalId: { 
    type: Number, 
    required: true,
    validate: { validator: Number.isInteger, message: '{VALUE} must be an integer' }
  },
  email: { type: String, required: true},
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('Users', userSchema);

module.exports = User