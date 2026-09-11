const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.ObjectId, ref: "patients", required:true},
    condition_name:{type:String},
    diagnose_date:{type:Date},
    condition_type:{type:String},
    severity:{type:String},
    status:{type:String},
    resolution_date:{type:Date}
},{timestamps:true})

module.exports = mongoose.model("medicalhistory",MedicalHistorySchema)  