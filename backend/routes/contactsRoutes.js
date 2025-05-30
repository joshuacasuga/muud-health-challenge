import express from 'express'
import { addContact, getContacts } from '../controllers/contactsController.js'
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/add', authenticateToken, addContact);
router.get('/user/', authenticateToken, getContacts);

export default router