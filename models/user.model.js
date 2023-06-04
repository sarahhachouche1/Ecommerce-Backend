import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'please add a name']
        },
        email: {
            type: String,
            required: [true, 'please add a email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'please add a password'],
            unique: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },

    {
        timestamps: true,
    }

);

const User = model('User', userSchema);
export default User;