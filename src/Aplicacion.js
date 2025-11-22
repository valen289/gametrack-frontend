import React from "react";
import { BrowserRouter as Enrutador, Routes, Route } from "react-router-dom";
import "./App.css";

//  Páginas principales
import Biblioteca from "./pages/Biblioteca";
import Estadisticas from "./pages/Estadisticas";
import IniciarSesion from "./pages/IniciarSesion";

function Aplicacion() {
  return (
    <Enrutador>
      <div className="Aplicacion">
     

        <Routes>
          <Route path="/" element={<Biblioteca />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        </Routes>
      </div>
    </Enrutador>
  );
}

export default Aplicacion;
