import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = ({ auth, setIsRegistered, setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          setIsRegistered(true);
          setIsLoggedIn(true);
          setUser(user.email);
          console.log(user.email, "has been signed up");
          navigate("/");
        }
      );
    } catch (error) {
      setIsRegistered(false);
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register:</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Go</button>
    </div>
  );
};

export default Register;
