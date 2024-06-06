import { Router } from 'express';
import { createReservation, getReservations } from '../controllers/reservationController.js';

const router = Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);

export default router;
