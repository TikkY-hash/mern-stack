import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type : String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, {
    timestamps : true,   
})

export default mongoose.model('Project', ProjectSchema)


