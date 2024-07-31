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
    loaction: {
        type: String,
        required: true,
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        username: {
            type: String,
            required: true,
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
        }
    }],
},
    {
        timestamps: true,
    }
)

export default mongoose.model('Events', EventSchema)