import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: [20, 'Username cannot exceed 20 characters']
        },
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Business name cannot exceed 50 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    }
}, {
    timestamps: true,
});

export default mongoose.model('Businesses', BusinessSchema);
