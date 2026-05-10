import { useState, useEffect } from "react";
import { getEstadisticas } from "../services/api";

function AdminEstadisticas() {
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        getEstadisticas().then(data => setPlatos(data));
    }, []);

    return (
        <div className="estadisticas-container">
            <h1>Estadísticas de ventas</h1>
            <div className="estadisticas-grid">
                {platos.map(plato => (
                    <div key={plato.id} className="estadistica-tarjeta">
                        <h3>{plato.nombre}</h3>
                        <p className="estadistica-unidades">{plato.total_vendido} unidades vendidas</p>
                        <div className="barra-fondo">
                            <div
                                className="barra-progreso"
                                style={{ width: `${plato.porcentaje}%` }}
                            />
                        </div>
                        <span className="estadistica-porcentaje">{plato.porcentaje}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminEstadisticas;