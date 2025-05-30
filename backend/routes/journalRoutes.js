import express from 'express'
import { createJournalEntry, getJournalEntries } from '../controllers/journalController.js'
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/entry', authenticateToken, createJournalEntry);
router.get('/user', authenticateToken, getJournalEntries);

export default router