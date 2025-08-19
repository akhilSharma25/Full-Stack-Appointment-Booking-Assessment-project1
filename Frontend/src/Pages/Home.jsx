import { Link, Outlet } from "react-router";

export function Home({ user, handleLogout }) {
  console.log("Logged-in user:", user);

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#1976d2",
          color: "white",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>Booking App</div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link to="/home/slots" style={{ color: "white", textDecoration: "none" }}>
            Available Slots
          </Link>
          <Link to="/home/book" style={{ color: "white", textDecoration: "none" }}>
            Book Slot
          </Link>
          <Link to="/home/my-bookings" style={{ color: "white", textDecoration: "none" }}>
            My Bookings
          </Link>

          {user?.role === "admin" && (
            <Link to="/home/bookings-info" style={{ color: "white", textDecoration: "none" }}>
              All Bookings
            </Link>
          )}

          <button
            onClick={handleLogout}
            style={{
              background: "#e53935",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "white",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>
        {user && (
          <div className="container" style={{ marginBottom: "20px" }}>
            <div className="card">
              <h3>Profile</h3>
              <p>
                <strong>Name:</strong> {user.username || "Unknown"}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "Unknown"}
              </p>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}