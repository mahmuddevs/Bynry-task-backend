import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        photo: {
            type: String,
            default: "/uploads/default-user.jpg",
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Please enter a valid email",
            ],
        },
        location: {
            address: { type: String, required: [true, "Address is required"] },
            latitude: { type: Number, required: [true, "Latitude is required"] },
            longitude: { type: Number, required: [true, "Longitude is required"] },
        },
        contact: {
            phone: {
                type: String,
                trim: true,
                required: [true, "Phone number is required"],
            },
            social: {
                linkedin: { type: String, trim: true, default: "" },
                twitter: { type: String, trim: true, default: "" },
            },
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
