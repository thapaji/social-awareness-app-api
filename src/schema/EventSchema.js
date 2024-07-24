import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    causeId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    loaction: {
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

export default mongoose.model('event', EventSchema)