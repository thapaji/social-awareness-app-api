import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
    business: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Business name cannot exceed 50 characters']
        // businessId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Business',
        //     required: true,
        // },
        // name: {
        //     type: String,
        //     required: true,
        //     trim: true,
        //     maxlength: [50, 'Business name cannot exceed 50 characters']
        // }
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
    image: {
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
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true,
});

export default mongoose.model('Advertisements', AdvertisementSchema);
