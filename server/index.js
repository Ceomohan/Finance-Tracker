const express = require("express")
const mongoose = require("mongoose")
const port = process.env.PORT || 3001
const financialRecord = require("./src/routes/financial-record")
const cors = require("cors")

const app = express()
const mongoURI = "mongodb+srv://Mohan:AMR7114@personalfinancetracker.kqizk.mongodb.net/"

mongoose
    .connect(mongoURI)
    .then(()=>console.log("Connected To MongoDb"))
    .catch((err)=>console.error("Failed to connect to MongoDb",err))

app.use(express.json())
app.use(cors())
app.use("/financial-records",financialRecord)


app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`)
})