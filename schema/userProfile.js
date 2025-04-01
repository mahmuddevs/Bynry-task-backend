import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        photo: {
            type: String,
            default: "/uploads/default-user.jpg",
        },
        description: {
            type: String,
            maxlength: 500,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        location: {
            address: { type: String, required: true },
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        contact: {
            phone: { type: String, trim: true },
            social: {
                linkedin: { type: String, trim: true },
                twitter: { type: String, trim: true },
            },
        },
    },
    {
        timestamps: true
    }
)


export const User = mongoose.Model("User", userSchema)