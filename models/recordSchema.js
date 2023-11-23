import {Schema, model} from "mongoose";



const RecordSchema = new Schema({
    title: {type:String, required:true}, 
    description: {type:String, required:true}, 
    price : {type:Number, required:true},
    brand:{type:String},
    rating:{type:Number},
    category:{type:String, required:true},
    thumbnail:{type:String, required:true}, 
    images: [String]    
})

const RecordModel = model("Record",RecordSchema)  

export default RecordModel;