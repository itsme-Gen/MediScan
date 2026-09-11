const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    middle_name:{type:String, required:true},
    last_name :{type:String, required:true},
    id_number: {type:String, required:true},
    date_of_birth: {type:String, required:true},
    gender:{type:String, required:true},
    contact_number:{type:Number, required:true},
    email_address:{type:String},
    home_address:{type:String, required:true},
    emergency_contact_number:{type:Number},
    },
    {
    timestamps: true
});
const Patient = mongoose.model('patients',PatientSchema)
module.exports = Patient