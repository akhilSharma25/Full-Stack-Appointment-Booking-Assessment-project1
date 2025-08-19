import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Slots from "./components/Slots";
import BookSlot from "./components/Bookslot";
import MyBookings from "./components/MyBooking";
import { Home } from "./Pages/Home.jsx";
import AdminDashboard from "./Pages/Admin.jsx";

// Admin route wrapper
function AdminRoute({ user, children }) {
  if (!user || user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parseUser=JSON.parse(storedUser)
      console.log(parseUser);
      
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // done checking localStorage
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (loading) return <div>Loading...</div>; // show a spinner or loading text

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {user ? (
          <>
            <Route path="/home" element={<Home user={user} handleLogout={handleLogout} />}>
              <Route path="slots" element={<Slots />} />
              <Route path="book" element={<BookSlot />} />
              <Route path="my-bookings" element={<MyBookings />} />

              {/* Admin-protected route */}
              <Route
                path="bookings-info"
                element={
                  <AdminRoute user={user}>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* Default redirect for /home */}
              <Route index element={<Navigate to="slots" replace />} />
            </Route>
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
