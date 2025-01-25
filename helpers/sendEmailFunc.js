import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { senderEmail, senderPassword } = process.env;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
});

export default function sendEmailFunc(recipientEmail, token, callback) {
    if (!recipientEmail) {
        callback(new Error("Recipient email is required"), null);
        return;
    }

    console.log(`Sending email to ${recipientEmail} with token ${token}`);

    const verificationUrl = `http://localhost:3000/verifyEmail?token=${token}`;
    const mailOption = {
        from: senderEmail,
        to: recipientEmail,     
        subject: "Email Verification",
        html: `
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px;">
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); max-width: 500px; margin: 0 auto; text-align: center;">
                    <h2 style="margin-bottom: 20px;">Email Verification</h2>
                    <p style="margin-bottom: 20px;">Click the button below to verify your email address:</p>
                    <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
                </div>
            </body>
        </html>
        `
    };

    transporter.sendMail(mailOption, (error, success) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, success);
        }
    });
}
