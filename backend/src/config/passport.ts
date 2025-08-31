import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../models/User.js';


dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false);
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name: profile.displayName, googleId: profile.id, isVerified: true });
        } else {

            if (!user.googleId) {
                user.googleId = profile.id;
                user.isVerified = true;
                await user.save();
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err as any, undefined);
    }
}));


export default passport;