const express = require("express")
const FinancialRecord = require("../schema/financial-record")


const router = express.Router()

router.get("/getAllByUserId/:userId", async (req,res)=>{
    try{
        const userId = req.params.userId
        const records = await FinancialRecord.find({userId:userId})
        if(records.length === 0){
            return res.status(404).send("Record not Found")
        }
        res.status(200).send(records)
    }catch(err){
        return res.status(500).send(err)
    }
})
router.post("/", async (req,res)=>{
    try{
        const newRecordBody = req.body
        const newRecord = new FinancialRecord(newRecordBody)
        const savedRecord = await newRecord.save()

        res.status(200).send(savedRecord)
    }catch(err){
        return res.status(500).send(err)
    }
})
router.put("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const newRecordBody = req.body
        const record = await FinancialRecord.findByIdAndUpdate(
            id,
            newRecordBody,
            {new:true}
        )
        if(!record) return res.status(404).send("Not Found")
        res.status(200).send(record)
    }catch(err){
        return res.status(500).send(err)
    }
})
router.delete("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const record = await FinancialRecord.findByIdAndDelete(id)
        if(!record) return res.status(404).send("Not Found")
        res.status(200).send(record)
    }catch(err){
        return res.status(500).send(err)
    }
})

module.exports = router