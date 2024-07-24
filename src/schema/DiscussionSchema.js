•	Discussion: { id, causeId, userId, comment, createdAt }

import mongoose from 'mongoose'

const DiscussionSchema = new mongoose.Schema({
    causeId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

export default mongoose.model('discussion', DiscussionSchema)