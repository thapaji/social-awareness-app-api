import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [20, 'Long names are not allowed']
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
    status: {
        type: String,
        default: 'notverified',
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    refreshJWT: {
        type: String,
        default: '',
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('Users', UserSchema)