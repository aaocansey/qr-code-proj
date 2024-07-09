const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    indexNum: {type:Number, required: true, unique: true},
    createdAt: {type:Date, default:Date.now()}
});


const studentModel = mongoose.model("students", studentSchema);

