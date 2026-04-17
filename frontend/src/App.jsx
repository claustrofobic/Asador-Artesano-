import { Routes, Route } from 'react-router-dom';
import Inicio from './views/Inicio';
import Carta from './views/Carta';
import QuienesSomos from './views/QuienesSomos';
import Login from './views/Login';
import Registro from './views/Registro';
import MisPedidos from './views/MisPedidos';
import Navbar from './components/Navbar';   
import RutaProtegida from './components/RutaProtegida';
import Carrito from './components/Carrito';

function App() {
  return (
    <>
      <Navbar />
      <Carrito />
      
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/carta" element={<Carta />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/mis-pedidos" element={
        <RutaProtegida>
        <MisPedidos />        
      </RutaProtegida>} 
      />
    </Routes>
    </>
  )
}

export default App