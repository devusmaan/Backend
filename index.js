import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import signupRoutes from './routes/signup.js';
import loginRoutes from './routes/login.js'
import nodemailer from 'nodemailer';
import emailVerificationRoutes from './routes/emailverification.js';





const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('short'));

dotenv.config()

const { port, mongoDBURL, senderEmail, senderPassword, tokenSecret } = process.env;

mongoose
    .connect(mongoDBURL)
    .then(() => console.log("=====DATABASE CONNECTED====="))
    .catch(() => console.log("=====DATABASE CONNECTION FAILED"))


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
})



app.use('/signup', signupRoutes);

app.use('/login', loginRoutes)

app.use('/', emailVerificationRoutes);



app.listen(port, () => {
    console.log(`server is running on Port:${port}`);
})


