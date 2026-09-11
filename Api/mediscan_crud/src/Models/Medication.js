const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    patientId : {type:mongoose.Schema.ObjectId, ref: 'patients', required:true},
    medication_name:{type:String,},
    start_date:{type:String},
    dosage:{type:String},
    frequency:{type:String}
},
{timestamps:true});

module.exports = mongoose.model("medications",medicationSchema)