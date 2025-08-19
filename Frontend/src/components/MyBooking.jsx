import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch user's bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/detail/bookings/me", {
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
    fetchBookings();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div className="card">
        <h2>My Bookings</h2>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} style={{ marginBottom: "10px" }}>
              <p>
                <strong>Slot:</strong>{" "}
                {booking.slot_id
                  ? `${new Date(booking.slot_id.start_at).toLocaleString()} - ${new Date(booking.slot_id.end_at).toLocaleString()}`
                  : "Unknown Slot"}
              </p>
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
}