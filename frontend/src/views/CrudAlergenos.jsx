import { useState, useEffect } from "react";
import { getAlergenos, deleteAlergeno } from "../services/api";
import { useNavigate } from "react-router-dom";

import "../assets/css/carta.css";

function CrudAlergenos() {
  // Lista plana de alergenos, sin anidamiento
  const [alergenos, setAlergenos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarAlergenos = async () => {
      const datos = await getAlergenos();
      setAlergenos(datos);
    };

    cargarAlergenos();
  }, []);

  return (
    <div className="carta-container">
      <h1>Listado de Alérgenos</h1>
      <button className="btn-agregar" onClick={() => navigate("/admin/alergenos/nuevo")}>
        Agregar Alérgeno
      </button>

      <div className="platos-grid">
        {alergenos.map((alergeno) => (
          <div key={alergeno.id} className="tarjeta-plato">
            <h3>{alergeno.nombre}</h3>
            <button className="btn-editar" onClick={() => navigate(`/admin/alergenos/${alergeno.id}/editar`)}>
              Editar
            </button>
            <button className="btn-eliminar" onClick={() => deleteAlergeno(alergeno.id).then(() => {
              // Recargar la lista de alérgenos después de eliminar
              getAlergenos().then(setAlergenos);
            })}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrudAlergenos;