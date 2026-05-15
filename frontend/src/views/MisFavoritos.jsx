import { useState, useEffect } from "react";
import { getFavoritos } from "../services/api";
import "../assets/css/favoritos.css";

function MisFavoritos() {
  const [mis_favoritos, setFavoritos] = useState([]);
  //al cargar el componente carga los favoritos
  useEffect(() => {
    const cargarMisFavoritos = async () => {
      const datos = await getFavoritos();
      setFavoritos(datos);
    };
    cargarMisFavoritos();
  }, []);

  return (
    <div className="favoritos-container">
      <h1>Mis favoritos</h1>
      {mis_favoritos.length === 0 ? (
        <p>Todavía no tienes favoritos.</p>
      ) : (
        <div className="favoritos-grid">
          {mis_favoritos.map((favorito) => (
            <div key={favorito.id} className="tarjeta-favorito">
              {favorito.plato.imagen_url && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/storage/${favorito.plato.imagen_url}`}
                  alt={favorito.plato.nombre}
                  className="plato-imagen"
                />
              )}
              <div className="tarjeta-body">
                <h2>{favorito.plato.nombre}</h2>
                <p>{favorito.plato.descripcion}</p>
                <p className="precio">{favorito.plato.precio} €</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisFavoritos;
