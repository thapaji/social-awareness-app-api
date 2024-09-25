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
    image: {
        type: String,
        trim: true,
        default: '',
    },
    cause: {
        causeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'cause',
        },
        causeTitle: {
            type: String,
            required: true,
        }
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    participants: [{
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        image:{
            type: String,
            trim: true,
            default: '',
        }
    }],
    comments: [{
        username: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        }
    }],
},
    {
        timestamps: true,
    }
)

export default mongoose.model('Events', EventSchema)