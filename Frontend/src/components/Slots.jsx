import { useEffect, useState } from "react";

export default function Slots() {
  const [slots, setSlots] = useState([]);

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

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Available Slots</h2>
        {Array.isArray(slots) && slots.length > 0 ? (
          slots.map((slot, index) => (
            <div key={slot._id || index} style={{ marginBottom: "10px" }}>
              {new Date(slot.start_at).toLocaleString()} -{" "}
              {new Date(slot.end_at).toLocaleString()}
            </div>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </div>
    </div>
  );
}
