const prisma = require('../../prismaClient');
const moment = require('moment');

exports.createReservation = async (req, res) => {
  console.log('Requête reçue pour créer une réservation:', req.body);
  try {
    const userId = req.body.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    console.log('User ID:', userId);

    const reservationDate = moment(req.body.reservationDate).toDate();
    const reservationTime = moment(req.body.reservationTime, 'HH:mm').toDate();
    
    const reservationData = {
      reservationDate,
      reservationTime,
      numberOfGuests: parseInt(req.body.numberOfGuests),
      additionalInfo: req.body.additionalInfo,
      animals: req.body.animals,
      stroller: req.body.stroller,
      wheelchair: req.body.wheelchair,
      highChair: req.body.highChair,
      user: {
        connect: { id: userId }
      }
    };
    console.log('Données de réservation:', reservationData);

    const reservation = await prisma.reservation.create({
      data: reservationData,
    });
    console.log('Réservation créée avec succès:', reservation);
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation', details: error.message });
  }
};

exports.getReservations = async (req, res) => {
  console.log('Requête reçue pour récupérer les réservations');
  try {
    const reservations = await prisma.reservation.findMany();
    console.log('Réservations récupérées avec succès:', reservations);
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};
