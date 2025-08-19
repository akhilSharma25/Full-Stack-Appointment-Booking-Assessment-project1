import { useState, useEffect } from "react";

export default function BookSlot() {
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");

  // Fetch available slots
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

  // Book a slot
  const handleBookSlot = async (e) => {
    e.preventDefault();
    if (!selectedSlotId) {
      alert("Please select a slot");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/detail/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ slot_id: selectedSlotId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }
      console.log("Booked slot:", data); // Debug log
      alert(data.message || "Slot booked successfully");
      setSelectedSlotId(""); // Reset selection
      fetchSlots(); // Refresh slots
    } catch (err) {
      console.error("Error booking slot:", err);
      alert("Failed to book slot: " + err.message);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div className="card">
        <h2>Book a Slot</h2>
        {slots.length > 0 ? (
          <form onSubmit={handleBookSlot}>
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              style={{ padding: "5px", marginBottom: "10px", width: "100%" }}
            >
              <option value="">Select a slot</option>
              {slots.map((slot) => (
                <option key={slot._id} value={slot._id}>
                  {new Date(slot.start_at).toLocaleString()} -{" "}
                  {new Date(slot.end_at).toLocaleString()}
                </option>
              ))}
            </select>
            <button type="submit" style={{ padding: "5px 10px" }}>
              Book
            </button>
          </form>
        ) : (
          <p>No slots available</p>
        )}
      </div>
    </div>
  );
}
