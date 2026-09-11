const mongoose = require('mongoose')

const allergiesSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.ObjectId, ref: 'patients',require:true},
    allergen_name:{type:String},
    allergy_type:{type:String},
    reaction:{type:String},
    severity:{type:String}
},{timestamps:true})

module.exports = mongoose.model("allergies",allergiesSchema)