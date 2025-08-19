import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newSlot, setNewSlot] = useState({ start_at: "", end_at: "" });

  // Fetch all slots
  const fetchSlots = async () => {
    try {
      const res = await fetch("https://full-stack-appointment-booking.onrender.com/api/detail/slots", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched slots:", data); // Debug log
      const slotsArray = Array.isArray(data.slots) ? data.slots : [];
      setSlots(slotsArray);
    } catch (err) {
      console.error("Error fetching slots:", err);
      alert("Failed to fetch slots: " + err.message);
      setSlots([]);
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("https://full-stack-appointment-booking.onrender.com/api/detail/allbooking", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched bookings:", data); // Debug log
      const bookingsArray = Array.isArray(data.bookings) ? data.bookings : [];
      setBookings(bookingsArray);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to fetch bookings: " + err.message);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchBookings();
  }, []);

  // Create a new slot
  const handleCreateSlot = async () => {
    if (!newSlot.start_at || !newSlot.end_at) {
      return alert("Please enter both start and end times");
    }
    try {
      const res = await fetch("https://full-stack-appointment-booking.onrender.com/api/detail/create-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newSlot),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      console.log("Created slot:", await res.json()); // Debug log
      setNewSlot({ start_at: "", end_at: "" });
      fetchSlots();
    } catch (err) {
      console.error("Error creating slot:", err);
      alert("Failed to create slot: " + err.message);
    }
  };

  // Delete a slot
  const handleDeleteSlot = async (slotId) => {
    try {
      const res = await fetch(`https://full-stack-appointment-booking.onrender.com/api/detail/slots/${slotId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      console.log("Deleted slot:", slotId); // Debug log
      fetchSlots();
    } catch (err) {
      console.error("Error deleting slot:", err);
      alert("Failed to delete slot: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* Create Slot */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="datetime-local"
          value={newSlot.start_at}
          onChange={(e) => setNewSlot({ ...newSlot, start_at: e.target.value })}
          placeholder="Start time"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <input
          type="datetime-local"
          value={newSlot.end_at}
          onChange={(e) => setNewSlot({ ...newSlot, end_at: e.target.value })}
          placeholder="End time"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={handleCreateSlot}>Create Slot</button>
      </div>

      {/* View Slots */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Available Slots</h3>
        <ul>
          {Array.isArray(slots) && slots.length > 0 ? (
            slots.map((slot) => (
              <li key={slot._id} style={{ marginBottom: "5px" }}>
                {new Date(slot.start_at).toLocaleString()} -{" "}
                {new Date(slot.end_at).toLocaleString()}
                <button
                  onClick={() => handleDeleteSlot(slot._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No slots available</li>
          )}
        </ul>
      </div>

      {/* View Bookings */}
      <div>
        <h3>All Bookings</h3>
        <ul>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>User:</strong>{" "}
                  {booking.user_id?.username || "Unknown User"}
                </p>
                <p>
                  <strong>Slot:</strong>{" "}
                  {booking.slot_id
                    ? `${new Date(booking.slot_id.start_at).toLocaleString()} - ${new Date(booking.slot_id.end_at).toLocaleString()}`
                    : "Unknown Slot"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.created_at).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <li>No bookings available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
