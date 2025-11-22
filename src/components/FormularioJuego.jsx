import React, { useEffect, useState } from "react";

const FormularioJuego = ({ alGuardar, alCerrar, juegoEditando }) => {
  const [juego, setJuego] = useState({
    _id: "",
    titulo: "",
    genero: "",
    descripcion: "",
    horas: 0,
    rating: 0,
    urlImagen: "",
    status: "Pendiente",
  });

  useEffect(() => {
    if (juegoEditando) {
      setJuego(juegoEditando);
    } else {
      setJuego({
        _id: "",
        titulo: "",
        genero: "",
        descripcion: "",
        horas: 0,
        rating: 0,
        urlImagen: "",
        status: "Pendiente",
      });
    }
  }, [juegoEditando]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setJuego((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    alGuardar(juego);
  };

  return (
    <div className="modal-fondo">
      <div className="modal">
        <h2>{juego._id ? "Editar Juego" : "Agregar Juego"}</h2>

        <form onSubmit={manejarSubmit} className="formulario-juego">

          <label>Nombre del juego:</label>
          <input type="text" name="titulo" value={juego.titulo} onChange={manejarCambio} required />

          <label>Género:</label>
          <input type="text" name="genero" value={juego.genero} onChange={manejarCambio} required />

          <label>Descripción:</label>
          <textarea name="descripcion" value={juego.descripcion} onChange={manejarCambio} />

          <label>Estado:</label>
          <select name="status" value={juego.status} onChange={manejarCambio}>
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
            <option value="Abandonado">Abandonado</option>
          </select>

          <label>Horas jugadas:</label>
          <input type="number" name="horas" value={juego.horas} onChange={manejarCambio} min="0" />

          <label>Calificación (0-5):</label>
          <input type="number" name="rating" value={juego.rating} onChange={manejarCambio} min="0" max="5" />

          <label>URL de imagen:</label>
          <input type="text" name="urlImagen" value={juego.urlImagen} onChange={manejarCambio} placeholder="https://..." />

          <div className="botones-formulario">
            <button type="submit" className="guardar-btn">{juego._id ? "Guardar" : "Agregar"}</button>
            <button type="button" className="cancelar-btn" onClick={alCerrar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioJuego;
