import express from 'express';
import passport from '../config/passport.js';
import {
  sendOtp,
  verifyOtp,
  resendOtp,
  googleCallbackHandler,
} from '../controllers/authController.js';
import { requireFields } from '../middleware/validateRequest.js';

const router = express.Router();

// POST /api/auth/send-otp
router.route('/send-otp').post(requireFields(['email']), sendOtp);

// POST /api/auth/verify-otp
router.route('/verify-otp').post(requireFields(['email', 'otp']), verifyOtp);

//  POST /api/auth/resend-otp
router.route('/resend-otp').post(requireFields(['email']), resendOtp);

// GET /api/auth/google
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /api/auth/google/callback
router.route('/google/callback').get(passport.authenticate('google', { session: false, failureRedirect: '/signin' }),googleCallbackHandler
);

export default router;
