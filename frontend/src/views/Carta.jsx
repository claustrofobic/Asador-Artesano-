import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";
import { getFavoritos, setFavorito, deleteFavorito } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import "../assets/css/carta.css";

function Carta() {
  const [categorias, setCategorias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { añadirPlato } = useCarrito();

  // al cargar el componente carga los platos y si estamos logueados, saca los favoritso
  useEffect(() => {
    const cargarPlatos = async () => {
      const datos = await getPlatos();
      setCategorias(datos);
      if (token) {
        const favs = await getFavoritos();
        setFavoritos(favs);
      }
    };
    cargarPlatos();
  }, []);

  //añade el plato al pedido, si no estás logueado te manda a login
  const setPedidoBtn = async (plato) => {
    if (token) {
      añadirPlato(plato);
    } else {
      navigate("/login");
    }
  };

  // función para saber si un plato es favorito, devuelve true si el plato está en favoritos
  const esFavorito = (platoId) => favoritos.some((f) => f.plato_id === platoId);

  // función para añadir o eliminar un plato de favoritos, si ya es favorito lo elimina, sino lo añade
  const toggleFavorito = async (plato) => {
    if (esFavorito(plato.id)) {
      const fav = favoritos.find((f) => f.plato_id === plato.id);
      await deleteFavorito(fav.id);
      setFavoritos(favoritos.filter((f) => f.plato_id !== plato.id));
    } else {
      const nuevoFavorito = await setFavorito(plato.id);
      setFavoritos([...favoritos, nuevoFavorito]);
    }
  };

  return (
    <div className="carta-container">
      <h1>Nuestra Carta</h1>
      {token && (
        <button className="btn-favoritos" onClick={() => navigate("/favoritos")}>
          Ver Favoritos
        </button>
      )}
      {categorias.map((categoria) => (
        <div key={categoria.id} className="categoria-seccion">
          <h2>{categoria.nombre}</h2>
          <div className="platos-grid">
            {categoria.platos.map((plato) => (
              <div key={plato.id} className="tarjeta-plato">
                {plato.imagen_url && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${plato.imagen_url}`}
                    alt={plato.nombre}
                    className="plato-imagen"
                  />
                )}
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
                {plato.alergenos.length > 0 && (
                  <p className="alergenos">
                    {plato.alergenos.map((a) => a.nombre).join(", ")}
                  </p>
                )}
                <p className="precio">{plato.precio} €</p>
                <div className="tarjeta-plato-acciones">
                  {token && (
                    <button className="btn-favorito" onClick={() => toggleFavorito(plato)}>
                      {esFavorito(plato.id) ? (
                        <i className="fa-solid fa-heart" style={{ color: "rgb(157, 13, 0)" }}></i>
                      ) : (
                        <i className="fa-regular fa-heart" style={{ color: "rgb(157, 13, 0)" }}></i>
                      )}
                    </button>
                  )}
                  <button className="btn-pedido" onClick={() => setPedidoBtn(plato)}>
                    {token ? "Añadir al pedido" : "¡Pide ya!"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carta;