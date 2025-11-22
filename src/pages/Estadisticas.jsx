import React, { useEffect, useState } from "react";
import api from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie } from "react-icons/fa";

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    completados: 0,
    horasTotales: 0,
    promedio: 0,
  });

  const [porEstado, setPorEstado] = useState([]);
  const [porPlataforma, setPorPlataforma] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/estadisticas");
        setEstadisticas(res.data.resumen);
        setPorEstado(res.data.porEstado);
        setPorPlataforma(res.data.porPlataforma);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="contenedor-estadisticas">
      
      <aside className="barra-lateral">
        <h2> Panel</h2>
        <ul className="menu-lateral">
          <li>
            <a href="/" className="boton-lateral">
               Mis Juegos
            </a>
          </li>
          <li className="activo">
            <a href="/estadisticas" className="boton-lateral">
              <FaChartPie color="#14b8a6" />
              <span>Estadísticas</span>
            </a>
          </li>
        </ul>

        <div className="estadisticas-rapidas">
          <h4> Resumen rápido</h4>
          <p>Total: <b>{estadisticas.total}</b></p>
          <p> Completados: <b>{estadisticas.completados}</b></p>
          <p>Horas: <b>{estadisticas.horasTotales}</b></p>
        </div>
      </aside>

      
      <main className="contenido-estadisticas">

        <header className="encabezado-estadisticas">
          <h1>Estadísticas Personales</h1>
        </header>

        
        <section className="tarjetas-estadisticas">
          <div className="tarjeta">
            <h3>Total de Juegos</h3>
            <span>{estadisticas.total}</span>
          </div>
          <div className="tarjeta">
            <h3>Juegos Completados</h3>
            <span>{estadisticas.completados}</span>
          </div>
          <div className="tarjeta">
            <h3>Horas Totales</h3>
            <span>{estadisticas.horasTotales}</span>
          </div>
          <div className="tarjeta">
            <h3>Promedio Rating</h3>
          <span>{estadisticas.promedio}</span>
          </div>
        </section>

        {/* GRÁFICOS */}
        <section className="graficos-estadisticas">

          <div className="grafico">
            <h3>Juegos por Estado</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={porEstado}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="estado" stroke="#a9b4d0" />
                <YAxis stroke="#a9b4d0" />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grafico">
            <h3>Juegos por Plataforma</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={porPlataforma}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="plataforma" stroke="#a9b4d0" />
                <YAxis stroke="#a9b4d0" />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Estadisticas;
