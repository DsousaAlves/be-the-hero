import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

import api from "../../services/api";

import "./styles.css";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogon = async e => {
    e.preventDefault();

    try {
      const response = await api.post("session", { id });
      localStorage.setItem("idONG", id);
      localStorage.setItem("nameONG", response.data.name);
      history.push("/profile");
    } catch (error) {
      alert("ID inváldio");
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
