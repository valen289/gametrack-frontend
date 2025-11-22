import React, { useState } from "react";
import api from "../api";

const FormularioReseña = ({ idJuego, alAgregarReseña }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombreUsuario || !calificacion) {
      alert("Por favor completa el nombre y la calificación.");
      return;
    }

    setCargando(true);
    try {
      const respuesta = await api.post(`/reseñas/${idJuego}`, {
        username: nombreUsuario,
        rating: calificacion,
        comment: comentario,
      });

      alAgregarReseña(respuesta.data);
      setNombreUsuario("");
      setCalificacion("");
      setComentario("");
    } catch (error) {
      console.error("❌ Error al agregar reseña:", error);
      alert("Hubo un problema al agregar la reseña.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario-reseña" onSubmit={manejarEnvio}>
      <h3> Agregar Reseña</h3>

      <input
        type="text"
        placeholder="Tu nombre"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Calificación (1 a 10)"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
        min="1"
        max="10"
        required
      />

      <textarea
        placeholder="Escribe un comentario..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      ></textarea>

      <button type="submit" disabled={cargando}>
        {cargando ? "Agregando..." : "Agregar Reseña"}
      </button>
    </form>
  );
};

export default FormularioReseña;
