import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr"; // Import French locale for moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import "../style/ReservationPage.scss";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Block from "../components/Block";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

moment.locale("fr"); // Set moment to use French locale
const localizer = momentLocalizer(moment);

const Reservation = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [animals, setAnimals] = useState(false);
  const [stroller, setStroller] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [highChair, setHighChair] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateTimeSlots(new Date());
  }, []);

  const generateTimeSlots = (date) => {
    const startHour = 12; // 12 PM
    const endHour = 15; // 3 PM
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        slots.push({
          start: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minutes
          ),
          end: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minutes + 15
          ),
          title: "Créneau disponible",
          allDay: false,
        });
      }
    }
    setEvents(slots);
  };

  const handleSelectEvent = (event) => {
    setSelectedSlot(event);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedSlot) {
      newErrors.selectedSlot = "Veuillez sélectionner un créneau horaire.";
    }
    if (!guests) {
      newErrors.guests = "Veuillez entrer le nombre de couverts.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const newEvent = {
      start: selectedSlot.start.toISOString(),
      guests,
      notes,
      animals,
      stroller,
      wheelchair,
      highChair,
    };

    try {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents([...events.filter((e) => e !== selectedSlot), data]);
        setSelectedSlot(null);
        setGuests(1);
        setNotes("");
        setAnimals(false);
        setStroller(false);
        setWheelchair(false);
        setHighChair(false);
        setErrors({});
        // Affiche un toast de succès
        toast.success("Réservation réussie !");
      } else {
        console.error("Failed to create reservation");
        // Affiche un toast d'erreur en cas d'échec de la réservation
        toast.error("Échec de la réservation. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error creating reservation", error);
      // Affiche un toast d'erreur en cas d'erreur lors de la création de la réservation
      toast.error(
        "Erreur lors de la création de la réservation. Veuillez réessayer."
      );
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header
        backgroundImage={`${process.env.PUBLIC_URL}/asset/header/header-reservation.jpg`}
      />
      <div className="container mx-auto px-auto">
        <Block
          title="Réservez une table"
          text=""
          imageUrl=""
          imageRight={false}
          showBackground={true}
          backgroundSize="small"
        />
        <div className="flex justify-center px-10">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={{ month: true, day: true }}
            step={15}
            timeslots={4}
            selectable
            onSelectEvent={handleSelectEvent}
            defaultView={Views.MONTH}
            style={{ height: 500, width: "100%" }}
            min={new Date(2024, 0, 1, 12, 0)} // 12 PM
            max={new Date(2024, 0, 1, 15, 0)} // 3 PM
          />
        </div>
        {selectedSlot && (
          <div className="mt-8 flex justify-center">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Vous avez sélectionné le{" "}
              {moment(selectedSlot.start).format("LLLL")}
            </h2>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 px-24">
          <div>
            <label className="block text-secondary text-lg">
              Nombre de couverts :
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max="20"
              className="w-full border border-secondary p-2 rounded-md"
            />
            {errors.guests && (
              <p className="text-xs text-tertiary mt-1">{errors.guests}</p>
            )}
          </div>
          <div>
            <label className="block text-secondary text-lg">
              Notes supplémentaires :
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-secondary p-2 rounded-md"
              rows="4"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={animals}
                onChange={(e) => setAnimals(e.target.checked)}
                className="mr-2"
              />
              <label className="text-secondary text-lg">Animaux</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={stroller}
                onChange={(e) => setStroller(e.target.checked)}
                className="mr-2"
              />
              <label className="text-secondary text-lg">Poussette</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={wheelchair}
                onChange={(e) => setWheelchair(e.target.checked)}
                className="mr-2"
              />
              <label className="text-secondary text-lg">Fauteuil roulant</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={highChair}
                onChange={(e) => setHighChair(e.target.checked)}
                className="mr-2"
              />
              <label className="text-secondary text-lg">Chaise haute</label>
            </div>
          </div>
          {errors.selectedSlot && (
            <p className="text-xs text-tertiary mt-1 text-center">
              {errors.selectedSlot}
            </p>
          )}
          <div className="flex justify-center">
            <Button type="submit" className="w-1/2 text-center p-2">
              Réserver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
