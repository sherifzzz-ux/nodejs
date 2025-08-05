import { Router } from 'express';
import multer from 'multer';
import { listMachines, createMachineHandler, updateMachineHandler, deleteMachineHandler } from './machine.controller';
import { isAdmin } from '../../middleware/isAdmin';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listMachines);
router.post('/:id', isAdmin, upload.single('image'), createMachineHandler);
router.put('/:id', isAdmin, upload.single('image'), updateMachineHandler);
router.delete('/:id', isAdmin, deleteMachineHandler);

export default router;
