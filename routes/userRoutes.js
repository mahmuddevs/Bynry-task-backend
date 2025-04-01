import express from 'express'
import { upload } from '../multer.js';

const userRoutes = express.Router()




userRoutes.post("/api/geocode", upload.single('user_image'), async (req, res) => {
    const { name, address } = req.body;

    if (!address) {
        return res.status(400).json({ error: "Address is required" });
    }


    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
        )}`;

        const response = await axios.get(url);

        if (response.data.length === 0) {
            return res.status(404).json({ error: "Address not found" });
        }

        const location = response.data[0];
        res.json({ latitude: location.lat, longitude: location.lon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



export default userRoutes