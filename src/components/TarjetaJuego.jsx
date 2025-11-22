import React, { useState } from "react";
import api from "../api";
import ListaReseñas from "./ListaReseñas";

const TarjetaJuego = ({ juego, alEliminar, alEditar }) => {
  const [eliminando, setEliminando] = useState(false);
  const [mostrarReseñas, setMostrarReseñas] = useState(false);

  const manejarEliminacion = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este juego?")) return;

    try {
      setEliminando(true);
      await api.delete(`/juegos/${juego._id}`);
      alEliminar(juego._id);
    } catch (error) {
      alert("Error al eliminar el juego.");
    } finally {
      setEliminando(false);
    }
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Pendiente": return "estado-pendiente";
      case "Jugando": return "estado-jugando";
      case "Completado": return "estado-completado";
      case "Abandonado": return "estado-abandonado";
      default: return "";
    }
  };

  return (
    <>
      <div className={`tarjeta-juego-pro ${eliminando ? "eliminando" : ""}`}>
        <div className="contenedor-imagen">
          <img src={juego.urlImagen} alt={juego.titulo} className="imagen-juego" />

          <span className={`estado-juego ${obtenerColorEstado(juego.status)}`}>
            {juego.status}
          </span>

          <div className="overlay-botones">
            <button onClick={() => alEditar(juego)} className="btn-azul">Editar</button>
            <button onClick={() => setMostrarReseñas(true)} className="btn-verde">Reseñas</button>
            <button onClick={manejarEliminacion} className="btn-rojo">Eliminar</button>
          </div>
        </div>

        <div className="info-juego">
          <h3>{juego.titulo}</h3>
          <p className="genero">{juego.genero}</p>

          <div className="estrellas">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={juego.rating >= s ? "activa" : ""}>★</span>
            ))}
          </div>

          <p className="horas">{juego.horas ? `${juego.horas} hrs` : "0 hrs"}</p>
        </div>
      </div>

      {mostrarReseñas && (
        <ListaReseñas idJuego={juego._id} cerrar={() => setMostrarReseñas(false)} />
      )}
    </>
  );
};

export default TarjetaJuego;
