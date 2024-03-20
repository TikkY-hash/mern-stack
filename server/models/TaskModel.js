import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type : String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        default : 'pending'
    },
    pos: {
        type: Number,
        default : null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task' 
    },
    childrenTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] 
}, {
    timestamps : true,   
})


export default mongoose.model('Task', TaskSchema)