import mongoose from 'mongoose';

const CauseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Education', 'Health', 'Environment', 'Social'],
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: [true, 'Created by is required'],
    },
    image: {
        type: String,
        trim: true,
        default: '',
    },
    participants: [{
        username: {
            type: String,
            required: true,
        }
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: [true, 'User ID is required']
        // },
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
}, {
    timestamps: true,
});

export default mongoose.model('Causes', CauseSchema);
