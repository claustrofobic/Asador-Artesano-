import { useState, useEffect } from "react";
import { getPlatos, updatePlato, deletePlato, setPlato } from "../services/api";
import { useNavigate } from "react-router-dom";


import "../assets/css/carta.css";

function CrudPlatos() {
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {
    const cargarPlatos = async () => {
      const datos = await getPlatos();
      setCategorias(datos);
    };


    cargarPlatos();

  }, []);




  return (
    <div className="carta-container">
      <h1>Listado de Platos </h1>
      <button className="btn-agregar" onClick={() => navigate("/admin/platos/nuevo")}>
        Agregar Plato
      </button>
      
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
                <button className="btn-editar" onClick={() => navigate(`/admin/platos/${plato.id}/editar`)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => deletePlato(plato.id).then(() => {
                  // Recargar la lista de platos después de eliminar
                  getPlatos().then(setCategorias);
                })}>
                  Eliminar
                </button>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CrudPlatos;
