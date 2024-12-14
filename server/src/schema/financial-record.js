const mongoose = require("mongoose")

const financialRecordSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("FinancialRecord",financialRecordSchema)