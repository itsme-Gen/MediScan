const mongoose = require('mongoose');

const labresultsSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.ObjectId,ref: 'patients', required: true},
    test_name:{type:String},
    test_date:{type:Date},
    test_result:{type:String},
    reference_range:{type:String},
    test_flag:{type:String},
},{timestamps:true})

module.exports = mongoose.model("labresults",labresultsSchema)