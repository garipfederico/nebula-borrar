import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Drawer from './reusable/drawer/Drawer'
import MenuCard from './reusable/card/MenuCard';
import Dashboard from './reusable/dashboard/Dashboard';
import {dataInicializacionCard, dataHomeCard } from './reusable/dashboard/cardsdata'
import Etiquetas from './components/etiquetas/Etiquetas';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Drawer open={true} showMenu={true} />
      <Routes>
        <Route path="/home" element={<Dashboard cardsDataArray={dataHomeCard}/>} />
        <Route path="/digitalizacion" element={<Dashboard cardsDataArray={dataInicializacionCard}/>} />
        <Route path="/digitalizacion/etiquetas" element={<Etiquetas/>} />
        <Route path="/login" element={<MenuCard />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
