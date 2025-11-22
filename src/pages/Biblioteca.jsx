import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import TarjetaJuego from "../components/TarjetaJuego";
import FormularioJuego from "../components/FormularioJuego";
import useJuegos from "../hooks/useJuegos";
const Biblioteca = () => {
  const { juegos, cargando, error, crearJuego, actualizarJuego, eliminarJuego } = useJuegos();
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const location = useLocation();

  const manejarGuardar = async (juego) => {
    if (juego._id) {
      await actualizarJuego(juego);
    } else {
      await crearJuego(juego);
    }
    setMostrarModal(false);
    setJuegoEditando(null);
  };

  const manejarEliminarJuego = async (id) => {
    await eliminarJuego(id);
  };

  const manejarEditarJuego = (juego) => {
    setJuegoEditando(juego);
    setMostrarModal(true);
  };

  return (
    <div className="contenedor-biblioteca">

      {/* Sidebar */}
      <aside className="barra-lateral">
        <h2> Menú</h2>
        <ul className="menu-lateral">
          <li className={location.pathname === "/" ? "activo" : ""}>
            <Link to="/" className="boton-lateral">
               <span>Mis Juegos</span>
            </Link>
          </li>
          <li className={location.pathname === "/estadisticas" ? "activo" : ""}>
            <Link to="/estadisticas" className="boton-lateral">
              <span>Estadísticas</span>
            </Link>
          </li>
        </ul>
        <div className="estadisticas-rapidas">
          <h4> Estadísticas rápidas</h4>
          <p>Total de juegos: {juegos.length}</p>
        </div>
      </aside>

      <main className="contenido-principal">
        <header className="encabezado-biblioteca">
          <h1>Mi Biblioteca de Juegos</h1>
          <button
            className="add-btn"
            onClick={() => {
              setJuegoEditando(null);
              setMostrarModal(true);
            }}
          >
            <FaPlus /> Agregar
          </button>
        </header>

        {cargando && <p>Cargando juegos...</p>}
        {error && <p style={{color:"red"}}>{error}</p>}

        <div className="rejilla-juegos">
          {juegos.length === 0 && !cargando ? (
            <p>No hay juegos agregados todavía.</p>
          ) : (
            juegos.map((j) => (
              <TarjetaJuego
                key={j._id}
                juego={j}
                alEliminar={manejarEliminarJuego}
                alEditar={manejarEditarJuego}
              />
            ))
          )}
        </div>
      </main>

      {mostrarModal && (
        <FormularioJuego
          alGuardar={manejarGuardar}
          alCerrar={() => setMostrarModal(false)}
          juegoEditando={juegoEditando}
        />
      )}
    </div>
  );
};

export default Biblioteca;
