import mongoose from 'mongoose';

import lecturerModel, { findOne } from '../models/lecturerModel';


export function signUpLecturer(req, res, next) {
    const {username, email, password} = req.body;

    const lecturer = new lecturerModel({username, email, password});
    
    if(!lecturer){
        return res.send({message:'unsuccessful', data:null})
        next();
    }
    
    lecturer.save();
    res.send({message:"successful", data:lecturer.email})
}


export async function loginLecturer(req, res, next){
    const {email, passowrd} = req.body

    const lecturer = await findOne({email});

    if(!lecturer){
        return res.send({message:'unsuccessful', data:null})
        next();
    }

    res.send({message:"successful", data:lecturer.email})
}

