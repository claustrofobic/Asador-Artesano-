import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/pedidos">Pedidos</Link>
          <Link to="/admin/platos">Platos</Link>
          <Link to="/admin/alergenos">Alérgenos</Link>
          <Link to="/admin/estadisticas">Estadísticas</Link>
        </nav>
      </aside>
      <main className="admin-contenido">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;