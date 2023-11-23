import { Router } from "express";

const router = Router()

import {getAllRecords,getSingleRecord,createRecord,updateRecord,deleteRecord} from "../controllers/recordControllers.js"
import { auth } from "../middleware/authorization.js";
import { isAdmin } from "../middleware/isAdmin.js";

// "/api/records"
router.get("/allrecords", getAllRecords) //read
router.get("/singlerecord/:id", getSingleRecord) //read single record
router.post("/newrecord", auth, isAdmin,  createRecord) // create
router.patch("/update/:id",auth,isAdmin, updateRecord) // update
router.delete("/delete/:id",auth,isAdmin,  deleteRecord) //delete
 
export default router;