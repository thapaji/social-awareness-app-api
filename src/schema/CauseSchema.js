import mongoose from 'mongoose'

const CauseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    participants: {
        type: String,
        default: 'user',
    },
},
    {
        timestamps: true,
    }
)

export default mongoose.model('cause', CauseSchema)