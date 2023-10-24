import React, { useState, ReactElement } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { AuthProps } from "../types/types";

const Login: React.FC<AuthProps> = ({
  auth,
  setIsLoggedIn,
  setIsRegistered,
  setUser,
}: AuthProps): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUser(user.email);
          setIsLoggedIn(true);
          setIsRegistered(true);
          navigate("/");
          console.log(user.email, "has been signed in");
        }
      );
    } catch (error) {
      alert(error);
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
