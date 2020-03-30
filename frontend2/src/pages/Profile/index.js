import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import "./style.css";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
  const idONG = localStorage.getItem("idONG");
  const nameONG = localStorage.getItem("nameONG");
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("incidents", {
          headers: {
            Authorization: idONG
          }
        });

        setIncidents(response.data.incidents);
      } catch (error) {
        alert("ocorreu um erro ao buscar os incidentes" + error);
      }
    };
    getData();
  }, [idONG]);

  const handleDelete = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: idONG
        }
      });
      setIncidents(incidents.filter(i => i.id !== id));
    } catch (error) {
      alert("Erro ao deletar caso" + error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero" />
        <span>Bem vinda, {nameONG}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>CASO:</strong>
            <p>{item.title}</p>
            <strong>Descrição:</strong>
            <p>{item.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </p>

            <button onClick={() => handleDelete(item.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
