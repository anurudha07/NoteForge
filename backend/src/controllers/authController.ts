import type{ Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { sendOTPEmail } from '../utils/mailer.js';


dotenv.config();


const signJwt = (user: { id: string; name: string; email: string }): string => {
  const secret = process.env.JWT_SECRET ?? 'secret';
  const expiresIn = (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ?? "2d";
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn });
};


export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) {
    console.warn(`sendOtp: email not found -> ${email}`); // <-- helpful debug
    return res.status(404).json({ message: 'User not found. Please sign up first.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashed = crypto.createHash('sha256').update(otp).digest('hex');
  user.otp = hashed;
  user.otpExpires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
  await user.save();

  try {
    await sendOTPEmail(email, otp);
    return res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    console.error('sendOtp: email send failed', err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const sendOtpSignup = async (req: Request, res: Response) => {
  console.log('sendOtpSignup called', req.body); // debug log
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  if (!name) return res.status(400).json({ message: 'Name is required' });

  let user = await User.findOne({ email });
  if (!user) {
    try {
      user = await User.create({ email, name, isVerified: false });
    } catch (err) {
      console.error('sendOtpSignup: create failed', err);
      return res.status(500).json({ message: 'Failed to create user' });
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashed = crypto.createHash('sha256').update(otp).digest('hex');
  user.otp = hashed;
  user.otpExpires = new Date(Date.now() + 1000 * 60 * 10);
  await user.save();

  try {
    await sendOTPEmail(email, otp);
    return res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    console.error('sendOtpSignup: email failed', err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};



export const verifyOtp = async (req: Request, res: Response) => {
const { email, otp } = req.body;
if (!email || !otp) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ email });
if (!user || !user.otp || !user.otpExpires) return res.status(400).json({ message: 'OTP not requested' });
if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP expired' });
const hashed = crypto.createHash('sha256').update(otp).digest('hex');
if (hashed !== user.otp) return res.status(400).json({ message: 'Invalid OTP' });
user.isVerified = true;
user.otp = undefined;
user.otpExpires = undefined;
await user.save();
const token = signJwt({ 
  id: user._id.toString(), 
  name: user.name ?? 'No Name', 
  email: user.email ?? 'noemail@example.com' 
});
return res.json({ token, user: { email: user.email, name: user.name } });

};


export const resendOtp = async (req: Request, res: Response) => {
const { email } = req.body;
if (!email) return res.status(400).json({ message: 'Email required' });
const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: 'User not found' });
const otp = Math.floor(100000 + Math.random() * 900000).toString();
const hashed = crypto.createHash('sha256').update(otp).digest('hex');
user.otp = hashed;
user.otpExpires = new Date(Date.now() + 1000 * 60 * 10);
await user.save();
try {
await sendOTPEmail(email, otp);
return res.json({ message: 'OTP resent' });
} catch (err) {
return res.status(500).json({ message: 'Failed to send OTP' });
}
};


export const googleCallbackHandler = async (req: any, res: Response) => {
  const user = req.user;
  const token = signJwt({
    id: user._id.toString(),
    name: user.name ?? 'No Name',
    email: user.email ?? 'noemail@example.com'
  });

  const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';

  // Send both token and user details in URL (URL encoded)
  const name = encodeURIComponent(user.name ?? 'No Name');
  const email = encodeURIComponent(user.email ?? 'noemail@example.com');

  return res.redirect(`${frontend}/dashboard?token=${token}&name=${name}&email=${email}`);
};
