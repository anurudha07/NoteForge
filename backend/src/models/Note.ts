import mongoose from 'mongoose';


export interface INote extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    title: string;
    content?: string;
}


const NoteSchema = new mongoose.Schema<INote>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, { timestamps: true });


export const Note = mongoose.model<INote>('Note', NoteSchema);