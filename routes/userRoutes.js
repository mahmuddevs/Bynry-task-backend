import express from 'express';
import { upload } from '../multer.js';
import axios from 'axios';
import { User } from '../schema/userProfile.js';

const userRoutes = express.Router();

//get all users
userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.find({})

        if (!users) {
            return res.send({ message: "Failed to fetch users" })
        }

        return res.send({ count: users.length, users })

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
})

//get single user
userRoutes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.send({ message: "Failed to fetch user" })
        }

        return res.send(user)

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
})

//create user
userRoutes.post("/create", upload.single('photo'), async (req, res) => {
    const { name, email, description, address, contact } = req.body;
    const userImage = req.file;

    if (!name || !email || !description || !address) {
        return res.send({ message: "One or more fields are required" });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios.get(url);

        if (response.data.length === 0) {
            return res.send({ messange: "Address not found" });
        }

        const locationData = response.data[0];
        const location = {
            address,
            latitude: parseFloat(locationData.lat),
            longitude: parseFloat(locationData.lon),
        };


        const payload = {
            name,
            email,
            photo: userImage?.path || 'uploads/default-user.jpg',
            description,
            location,
            contact,
        };

        const result = await User.create(payload);

        if (!result) {
            return res.send({ success: false, message: "Faild To Add User" })
        }

        return res.send({ success: true, message: "User Added Successfully", user: result })


    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
});

//Edit user
userRoutes.patch('/update/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const photo = req.file;

    let payload;

    if (!photo) {
        payload = { ...data };
    } else {
        payload = { ...data, photo: photo.path };
    }

    try {
        const result = await User.findByIdAndUpdate(id, payload, { new: true });

        if (!result) {
            return res.send({ success: false, message: "Failed to update user" });
        }

        return res.send({ success: true, message: "User updated successfully.", user: result });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
});


//delete user
userRoutes.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await User.findByIdAndDelete(id)

        if (!result) {
            return res.send({ success: false, message: "Failed to delete user" })
        }

        return res.send({ success: true, message: "User deleted successfully." })

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
})


export default userRoutes;
