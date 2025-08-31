import type{ Request, Response } from 'express';
import mongoose from 'mongoose';
import { Note } from '../models/Note.js';
import type{ AuthRequest } from '../middleware/auth.js';

// Create a new note 
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const note = await Note.create({
      title: title.trim(),
      content: content?.trim() || '',
      user: new mongoose.Types.ObjectId(userId),
    });

    return res.status(201).json(note);
  } catch (err) {
    console.error('createNote error:', err);
    return res.status(500).json({ message: 'Failed to create note' });
  }
};

// List notes 
export const listNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    return res.json(notes);
  } catch (err) {
    console.error('listNotes error:', err);
    return res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Delete note 
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note id' });
    }

    const note = await Note.findOne({ _id: id, user: userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    return res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('deleteNote error:', err);
    return res.status(500).json({ message: 'Failed to delete note' });
  }
};
