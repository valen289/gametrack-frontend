import { useState, useEffect } from "react";
import api from "../api";

export default function useJuegos() {
  const [juegos, setJuegos] = useState([]);

  const cargarJuegos = async () => {
    try {
      const res = await api.get("/juegos");
      setJuegos(res.data);
    } catch (error) {
      console.error("Error cargando juegos:", error);
    }
  };

  const crearJuego = async (nuevoJuego) => {
    await api.post("/juegos", nuevoJuego);
    await cargarJuegos();
  };

  const actualizarJuego = async (juego) => {
    await api.put(`/juegos/${juego._id}`, juego);
    await cargarJuegos();
  };

  const eliminarJuego = async (id) => {
    try {
      await api.delete(`/juegos/${id}`);
      await cargarJuegos();
    } catch (error) {
      console.error("Error eliminando juego:", error);
      alert("Error al eliminar juego");
      await cargarJuegos();
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return { juegos, crearJuego, actualizarJuego, eliminarJuego };
}
