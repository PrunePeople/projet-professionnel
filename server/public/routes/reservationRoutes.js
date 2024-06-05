// server/public/routes/reservationRoutes.js
const { Router } = require('express');
const { createReservation, getReservations } = require('../controllers/reservationController');

const router = Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);

module.exports = router;
