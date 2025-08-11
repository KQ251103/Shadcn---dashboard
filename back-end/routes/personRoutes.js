
import express from 'express';
import{
    getAllPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
} from '../controllers/personController.js';

const router = express.Router();
router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);
export default router;