import mongoose from 'mongoose';


export interface IUser extends mongoose.Document {
_id: mongoose.Types.ObjectId;
email: string;
name?: string;
googleId?: string;
isVerified: boolean;
otp?: string | undefined;
otpExpires?: Date  | undefined;
}


const UserSchema = new mongoose.Schema<IUser>({
email:{ 
    type: String, 
    required: true, 
    unique: true 
},
name:{
    type: String,
    required: true 
},
googleId:{ 
    type: String 
},
isVerified:{ 
    type: Boolean, 
    default: false 
},
otp:{ 
    type: String 
},
otpExpires: { 
    type: Date 
}
}, { timestamps: true });


export const User = mongoose.model<IUser>('User', UserSchema);