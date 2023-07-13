import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import Drawer from "./reusable/drawer/Drawer";
import MenuCard from "./reusable/card/MenuCard";
import Dashboard from "./reusable/dashboard/Dashboard";
import {dataDigitalizacionCard, dataInicioCard} from "./data/cardsdata";
import Etiquetas from "./components/etiquetas/Etiquetas";
import Lotes from "./components/lotes/Lotes";
import Documentos from "./components/documentos/Documentos";
import GestionDeUsuarios from "./components/gestionDeUsuarios/GestionDeUsuarios";

function App() {
  return (
    <div className="translucid">
      <div className="fondo">
        <BrowserRouter>
          <Drawer open={true} showMenu={true} />
          <Routes>
            <Route
              path="/home"
              element={<Dashboard cardsDataArray={dataInicioCard} />}
            />
            <Route
              path="/digitalizacion"
              element={<Dashboard cardsDataArray={dataDigitalizacionCard} />}
            />
            <Route path="/digitalizacion/etiquetas" element={<Etiquetas />} />
            <Route path="/digitalizacion/lotes" element={<Lotes />} />
            <Route path="/gestionDeUsuarios" element={<GestionDeUsuarios />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/login" element={<MenuCard />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
