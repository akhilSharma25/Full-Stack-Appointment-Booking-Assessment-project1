import { Slot, Booking, User } from "../models/userModel.js";
import { isAfter } from "date-fns";

// Create a new slot (Admin only)
export const createSlot = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    if (!start_at || !end_at) {
      return res.status(400).json({ success: false, message: "Both start and end times are required" });
    }

    const startDate = new Date(start_at);
    const endDate = new Date(end_at);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    if (isAfter(startDate, endDate)) {
      return res.status(400).json({ success: false, message: "Start time must be before end time" });
    }

    // Check for overlapping slots
    const overlappingSlots = await Slot.find({
      $or: [
        { start_at: { $lte: endDate, $gte: startDate } },
        { end_at: { $lte: endDate, $gte: startDate } },
        { start_at: { $lte: startDate }, end_at: { $gte: endDate } },
      ],
    });

    if (overlappingSlots.length > 0) {
      return res.status(400).json({ success: false, message: "Slot overlaps with an existing slot" });
    }

    const slot = await Slot.create({ start_at: startDate, end_at: endDate });
    res.status(201).json({ success: true, slot });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "This slot already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all available slots (not booked)
export const getAvailableSlots = async (req, res) => {
  try {
    const bookedSlots = await Booking.find().distinct("slot_id");
    const slots = await Slot.find({ _id: { $nin: bookedSlots } }).sort({ start_at: 1 });
    res.status(200).json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Book a slot (Patient only)
// controllers/BookingControllers.js
export const bookSlot = async (req, res) => {
  try {
    const { slot_id } = req.body;
    const userId = req.user.id;
    if (!slot_id) {
      return res.status(400).json({ success: false, message: "Slot ID is required" });
    }
    const slot = await Slot.findById(slot_id);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot not found" });
    }
    const existingBooking = await Booking.findOne({ slot_id });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "Slot already booked" });
    }
    const booking = await Booking.create({ user_id: userId, slot_id });
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings of logged-in patient
// controllers/BookingControllers.js
export const myBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user_id: userId }).populate("slot_id", "start_at end_at");
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all bookings
export const allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "username")
      .populate("slot_id", "start_at end_at");
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a slot (Admin only)
export const deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;

    // Ensure slot exists
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot not found" });
    }

    // Check if slot is booked
    const existingBooking = await Booking.findOne({ slot_id: slotId });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "Cannot delete a booked slot" });
    }

    await Slot.findByIdAndDelete(slotId);
    res.status(200).json({ success: true, message: "Slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};