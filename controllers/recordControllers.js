import RecordModel from "../models/recordSchema.js";


export const getAllRecords=async(req,res,next)=>{
    try{
        const allRecords = await RecordModel.find()
        res.send(allRecords)
    }
    catch(err){
        next(err)
    }
}

export const getSingleRecord=async(req,res,next)=>{
    // "/api/records/singlerecord/343v24kh2v3h42jh52" get
    try{
        const singleRecord = await RecordModel.findById(req.params.id)
        res.send(singleRecord)
    }
    catch(err){
        next(err)
    }
}

export const createRecord=async(req,res,next)=>{
    try{
        const record = await RecordModel.create(req.body)
        res.send(record)
    }
    catch(err){
        next(err)
    }
}

export const updateRecord=async(req,res,next)=>{
    // "/api/records/singlerecord/343v24kh2v3h42jh52" patch
    try{
        const updateRecord = await RecordModel.findByIdAndUpdate(req.params.id , req.body ,{new:true})
        res.send(updateRecord)
    }
    catch(err){
        next(err)
    }
}

export const deleteRecord=async(req,res,next)=>{
    // "/api/records/singlerecord/343v24kh2v3h42jh52" delete
    try{
        const deleteRecord = await RecordModel.findByIdAndDelete(req.params.id)
        res.send(deleteRecord)
    }
    catch(err){
        next(err)
    }
}