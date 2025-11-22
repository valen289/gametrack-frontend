import React, { useEffect, useState } from "react";
import api from "../api";

const ListaReseñas = ({ idJuego, cerrar }) => {
  const [reseñas, setReseñas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombreUsuario: "",
    calificacion: 5,
    comentario: "",
  });

  const cargarReseñas = async () => {
    try {
      const res = await api.get(`/reviews/${idJuego}`);
      setReseñas(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    }
  };

  useEffect(() => {
    cargarReseñas();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombreUsuario.trim() || !form.comentario.trim()) {
      return alert("Completa todos los campos.");
    }

    const data = {
      nombreUsuario: form.nombreUsuario,
      calificacion: Number(form.calificacion),
      comentario: form.comentario,
    };

    try {
      if (editando) {
        await api.put(`/reviews/${editando}`, data);
      } else {
        await api.post(`/reviews/${idJuego}`, data);
      }

      setForm({ nombreUsuario: "", calificacion: 5, comentario: "" });
      setEditando(null);
      await cargarReseñas();

    } catch (error) {
      console.error("❌ Error creando reseña:", error);
      alert("Error al crear la reseña");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar reseña?")) return;

    try {
      await api.delete(`/reviews/${id}`);
      cargarReseñas();
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  };

  const editar = (r) => {
    setEditando(r._id);
    setForm({
      nombreUsuario: r.nombreUsuario,
      calificacion: r.calificacion,
      comentario: r.comentario,
    });
  };

  return (
    <div className="modal-fondo">
      <div className="modal">
        <h2>Reseñas</h2>

        <form onSubmit={manejarSubmit} className="formulario-juego">
          <input
            placeholder="Tu nombre"
            value={form.nombreUsuario}
            onChange={(e) => setForm({ ...form, nombreUsuario: e.target.value })}
            required
          />

          <input
            type="number"
            min="1"
            max="10"
            value={form.calificacion}
            onChange={(e) => setForm({ ...form, calificacion: e.target.value })}
            required
          />

          <textarea
            placeholder="Escribe tu reseña..."
            value={form.comentario}
            onChange={(e) => setForm({ ...form, comentario: e.target.value })}
          />

          <button className="guardar-btn">
            {editando ? "Guardar" : "Agregar"}
          </button>
        </form>

        <hr />

        <div className="lista-reseñas">
          {reseñas.length === 0 && <p>No hay reseñas todavía.</p>}

          {reseñas.map((r) => (
            <div key={r._id} className="item-reseña">
              <p><b>{r.nombreUsuario}</b> — ⭐ {r.calificacion}/10</p>
              <p>{r.comentario}</p>

              <button onClick={() => editar(r)} className="btn-azul">Editar</button>
              <button onClick={() => eliminar(r._id)} className="btn-rojo">Eliminar</button>
            </div>
          ))}
        </div>

        <button className="cancelar-btn" onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
};

export default ListaReseñas;
