import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio";
import Carta from "./views/Carta";
import QuienesSomos from "./views/QuienesSomos";
import Login from "./views/Login";
import Registro from "./views/Registro";
import MisPedidos from "./views/MisPedidos";
import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./views/Admin";
import RutaAdmin from "./components/RutaAdmin";
import Carrito from "./components/Carrito";
import MisFavoritos from "./views/MisFavoritos";
import CrudAlergenos from "./views/CrudAlergenos";
import CrudPlatos from "./views/CrudPlatos";
import AdminLayout from "./components/AdminLayout";
import AdminPedidos from "./views/AdminPedidos";
import AdminEstadisticas from "./views/AdminEstadisticas";
import FormularioPlato from "./views/FormularioPlato";
import FormularioAlergenos from "./views/FormularioAlergenos";
import { useAuth } from "./context/AuthContext";



function App() {

  const { usuario } = useAuth();
  
  if (usuario?.rol !== 'admin') {
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
          <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />
          <Route path="/favoritos" element={<RutaProtegida><MisFavoritos /></RutaProtegida>} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
      <Navbar />
        <AdminLayout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />
          <Route path="/favoritos" element={<RutaProtegida><MisFavoritos /></RutaProtegida>} />

          <Route path="/admin" element={<RutaAdmin><Admin /></RutaAdmin>} />
          <Route path="/admin/pedidos" element={<RutaAdmin><AdminPedidos /></RutaAdmin>} />
          <Route path="/admin/platos" element={<RutaAdmin><CrudPlatos /></RutaAdmin>} />
          <Route path="/admin/alergenos" element={<RutaAdmin><CrudAlergenos /></RutaAdmin>} />
          <Route path="/admin/alergenos/nuevo" element={<RutaAdmin><FormularioAlergenos /></RutaAdmin>} />
          <Route path="/admin/alergenos/:id/editar" element={<RutaAdmin><FormularioAlergenos /></RutaAdmin>} />
          <Route path="/admin/estadisticas" element={<RutaAdmin><AdminEstadisticas /></RutaAdmin>} />
          <Route path="/admin/platos/nuevo" element={<RutaAdmin><FormularioPlato /></RutaAdmin>} />
          <Route path="/admin/platos/:id/editar" element={<RutaAdmin><FormularioPlato /></RutaAdmin>} />



        </Routes>
        </AdminLayout>
      </>
    );
  }

}

export default App;