import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ auth, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update your application state to indicate that the user is no longer logged in.
      navigate("/login"); // Redirect the user to the login page or any other desired destination.
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
