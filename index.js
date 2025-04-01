import express from "express"
import 'dotenv/config'
import cors from 'cors'
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"

const port = process.env.PORT || 3001

const app = express()

//middleware 
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))


//routes
app.use('/users', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database")
        app.listen(port, () => {
            console.log(`Listenting to port ${port}`)
        })
    })