import express from "express";
import cors from 'cors';
import morgan from 'morgan'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import router from './Routes/Route.js'

dotenv.config({ path: "./config.env" })

const port = process.env.PORT || 8000;
const app = express();

//use Middleware
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb", extended: true })); //By default this is 100kb
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", router)
app.use("/public", express.static("public"));



mongoose
    .connect(process.env.ALTAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message);
    });