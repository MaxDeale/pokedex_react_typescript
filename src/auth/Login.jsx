import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Login = ({ auth, setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUser(user.email);
          setIsLoggedIn(true);
          console.log(user.email, "has been signed in");
          navigate("/");
        }
      );
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Go</button>
    </div>
  );
};

export default Login;
