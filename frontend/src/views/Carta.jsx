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

  useEffect(() => {
    const cargarPlatos = async () => {
      const datos = await getPlatos();
      setCategorias(datos);
    };
    cargarPlatos();
  }, []);

  const setPedidoBtn = async (plato) => {
    if (token) {
      añadirPlato(plato);
      alert(`${plato.nombre} añadido al carrito`);
    } else {
      navigate("/login");
    }
  };

  const getFavoritos = async () => {
    if (token) {
      const favoritos = await getFavoritos();
      setFavoritos(favoritos);
    }
  };

  const esFavorito = (platoId) => favoritos.some((f) => f.plato_id === platoId);

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
      {categorias.map((categoria) => (
        <div key={categoria.id} className="categoria-seccion">
          <h2>{categoria.nombre}</h2>
          <div className="platos-grid">
            {categoria.platos.map((plato) => (
              <div key={plato.id} className="tarjeta-plato">
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
                {plato.alergenos.length > 0 && (
                  <p className="alergenos">
                    {plato.alergenos.map((a) => a.nombre).join(", ")}
                  </p>
                )}
                <p className="precio">{plato.precio} €</p>
                <button onClick={() => toggleFavorito(plato)}>
                  {esFavorito(plato.id) ? "❤️" : "🤍"}
                </button>
                <button
                  className="btn-pedido"
                  onClick={() => setPedidoBtn(plato)}
                >
                  {token ? "Añadir al pedido" : "¡Pide ya!"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carta;
