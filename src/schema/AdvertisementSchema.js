import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
    business: {
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: [50, 'Business name cannot exceed 50 characters']
        }
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    pictureUrl: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

export default mongoose.model('Advertisements', AdvertisementSchema);
