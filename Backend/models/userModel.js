import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["patient", "admin"], default: "patient" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const slotSchema = new mongoose.Schema({
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});
slotSchema.index({ start_at: 1, end_at: 1 }, { unique: true });

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export const Slot = mongoose.model("Slot", slotSchema);
export const Booking = mongoose.model("Booking", bookingSchema);