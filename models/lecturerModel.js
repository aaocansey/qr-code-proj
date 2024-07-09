const mongoose = require('mongoose')

const {Schema} = mongoose;


const lecturerSchema = new Schema({
    username: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    createdAt: {type:Date, default:Date.now()}
});


const lecturerModel = mongoose.model("lecturers", lecturerSchema);

module.exports = lecturerModel

