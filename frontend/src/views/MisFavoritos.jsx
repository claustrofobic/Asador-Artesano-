import {useState, useEffect } from 'react';
import { getFavoritos } from '../services/api';
import '../assets/css/pedidos.css';

function MisFavoritos() {
    const [mis_favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const cargarMisFavoritos = async () =>{
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
                mis_favoritos.map(favorito => (
                    <div key={favorito.id} className="tarjeta-favorito">
                        <h2>{favorito.plato.nombre}</h2>
                        <p>{favorito.plato.descripcion}</p>
                        <p className="precio">{favorito.plato.precio} €</p>
                        
                    {favorito.plato.imagen_url ?
                        <img src={favorito.plato.imagen_url} alt={favorito.plato.nombre} />
                    :
                        <p>No hay imagen disponible</p>
                    }
                    </div>
                ))
            )}
        </div>
    );
}

export default MisFavoritos