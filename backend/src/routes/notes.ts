import express from 'express';
import { createNote, listNotes, deleteNote } from '../controllers/noteController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireFields } from '../middleware/validateRequest.js';

const router = express.Router();

// JWT auth
router.use(requireAuth);

// GET /api/notes
router.route('/').get(listNotes);

// POST /api/notes
router.route('/').post(requireFields(['title']), createNote);

// DELETE /api/notes/:id
router.route('/:id').delete(deleteNote);

export default router;
