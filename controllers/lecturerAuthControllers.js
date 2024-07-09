

const lecturerModel = require('../models/lecturerModel');


exports.signUpLecturer = (req, res, next)=> {
    const {username, email, password} = req.body;

    const lecturer = new lecturerModel({username, email, password});
    
    if(!lecturer){
        return res.send({message:'unsuccessful', data:null})
        next();
    }
    
    lecturer.save();
    res.send({message:"successful", data:lecturer.email})
}


exports.loginLecturer = async (req, res, next) => {
    const {email, passowrd} = req.body

    const lecturer = await findOne({email});

    if(!lecturer){
        return res.send({message:'unsuccessful', data:null})
        next();
    }

    res.send({message:"successful", data:lecturer.email})
}

