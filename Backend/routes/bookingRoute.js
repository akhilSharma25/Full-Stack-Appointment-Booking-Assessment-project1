// routes/bookingRoute.js
import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import {
  allBookings,
  bookSlot,
  createSlot,
  getAvailableSlots,
  myBookings,
  deleteSlot,
} from "../controllers/BookingControllers.js";
import isAdmin from "../middlewares/isAdmin.js";

const bookingRoute = express.Router();

// Admin creates a new slot
bookingRoute.post("/create-slots", isAuthenticated, isAdmin, createSlot);

// Get all available slots (patients & admin)
bookingRoute.get("/slots", isAuthenticated, getAvailableSlots);

// Admin deletes a slot
bookingRoute.delete("/delete-slots/:slotId", isAuthenticated, isAdmin, deleteSlot);

// Patient books a slot
bookingRoute.post("/bookings", isAuthenticated, bookSlot);

// Patient views their own bookings
bookingRoute.get("/bookings/me", isAuthenticated, myBookings);

// Admin views all bookings
bookingRoute.get("/allbooking", isAuthenticated, isAdmin, allBookings);

export default bookingRoute;