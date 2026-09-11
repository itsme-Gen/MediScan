const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.ObjectId, ref: 'patients' , required:true},
    medication_name:{type:String},
    dosage:{type:String},
    quantity:{type:Number},
    date_prescribe:{type:Date},
    prescribing_provider:{type:String},
    frequency:{type:String},
},
{
    timestamps:true
});

module.exports = mongoose.model('prescriptions',prescriptionSchema)