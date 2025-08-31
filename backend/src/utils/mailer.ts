import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


export const sendOTPEmail = async (to: string, otp: string) => {
  const from = process.env.FROM_EMAIL || 'anurudhs567@gmail.com';
  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
  <h2 style="text-align: center; color: #333;">NoteForge Verification</h2>
  <p>Hi there,</p>
  <p>Use the following One-Time Password (OTP) to complete your verification process:</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <span style="font-size: 32px; font-weight: bold; padding: 15px 25px; border: 1px dashed #333; border-radius: 8px; letter-spacing: 5px; display: inline-block;">
      ${otp}
    </span>
  </div>

  <p style="color: #666;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
  <p>Thank you,<br><strong>NoteForge Team</strong></p>
</div>

`;
  await transporter.sendMail({ from, to, subject: 'One Time Password (OTP) for your Account on NoteForge', html });
};