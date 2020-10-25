const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    isComplete:{
        type:Boolean,
        default:false,
    }
})

//getting a dictionary with key 'taskSchema' and value of taskSchema
module.exports = mongoose.model('taskSchema',taskSchema);