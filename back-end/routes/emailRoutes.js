import express from 'express';

import {
    getInboxEmails,
    getArchivedEmails,
    getDeletedEmails,
    getEmailById,
    createEmail,
    deleteEmail,
    searchEmails,
    archiveEmail,
    moveToTrash,
    restoreEmail,
    togglePinEmail,
    uploadFileController
} from '../controllers/emailController.js';

const router = express.Router();
router.post('/upload', uploadFileController);
router.get("/inbox", getInboxEmails);
router.get("/archived", getArchivedEmails);
router.get("/deleted", getDeletedEmails);
router.get('/:id', getEmailById);
router.post('/', createEmail);
router.delete('/:id', deleteEmail);
router.get('/search', searchEmails);
router.patch('/:id/archive', archiveEmail);
router.patch('/:id/trash', moveToTrash);
router.patch('/:id/restore', restoreEmail);
router.patch('/:id/pin', togglePinEmail);
export default router;