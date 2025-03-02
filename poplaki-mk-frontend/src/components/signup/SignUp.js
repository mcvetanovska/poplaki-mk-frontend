import React, { useState } from "react";
import "../sharedStyles/FormStyles.css";
import api from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../customContainer/CustomContainer";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      nickname: email,
      password: password,
    };
    api
      .post("/users", body)
      .then((response) => {
        navigate("/complaints");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <CustomContainer minHeight={80}>
      <div className="auth-container">
        <h2 className="auth-title">Регистрација</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            className="auth-input"
            type="email"
            placeholder="Е-маил"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Лозинка"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">
            Регистрирај се
          </button>
        </form>
      </div>
    </CustomContainer>
  );
}

export default Signup;
