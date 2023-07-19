import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import {dataDigitalizacionCard, dataInicioCard} from "./data/cardsdata";
//Reusables
import Drawer from "./reusable/drawer/Drawer";
import MenuCard from "./reusable/card/MenuCard";
import Dashboard from "./reusable/dashboard/Dashboard";
//Pages
import Etiquetas from "./components/etiquetas/Etiquetas";
import Lotes from "./components/lotes/Lotes";
import Documentos from "./components/documentos/Documentos";
import GestionDeUsuarios from "./components/gestionDeUsuarios/GestionDeUsuarios";
import Landing from "./components/landing/Landing";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./AppLayout";
import { useEffect } from "react";
//States 
import {getUser} from './states/authState'


function App() {
  const dispatch = useDispatch()
  dispatch(getUser())
  useEffect(()=>{
  },[])
  const {isLoggedIn} = useSelector(state=>state.auth)
  return (
    <div className="translucid">
      <div className="fondo">
        <BrowserRouter>
          <Drawer open={true} showMenu={true} />
          <Routes>
          <Route path="/" element={<AppLayout />}>
          {(!isLoggedIn)?
          <>
          <Route path="/landing" element={<Landing/>} > </Route>
            <Route path="/*" element={<Navigate to="/landing" />} />
          </>
:
<>

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
            <Route path="/digitalizacion/lotes/:id" element={<Lotes />} />
            <Route path="/gestionDeUsuarios" element={<GestionDeUsuarios />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/login" element={<MenuCard />} />
            <Route path="/*" element={<Navigate to="/home" />} />
</>

          }
          </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
