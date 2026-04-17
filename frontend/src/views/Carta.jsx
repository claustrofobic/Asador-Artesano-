import { useState, useEffect } from 'react';
import { getPlatos} from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext'

function Carta() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { añadirPlato }  = useCarrito();

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
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>Nuestra Carta</h1>
            {categorias.map(categoria => (
                <div key={categoria.id}>
                    <h2>{categoria.nombre}</h2>
                    {categoria.platos.map(plato => (
                        <div key={plato.id}>
                            <h3>{plato.nombre}</h3>
                            <p>{plato.descripcion}</p>
                            <p>{plato.precio} €</p>
                            <button onClick={() => setPedidoBtn(plato)}>
                                {token ? 'Añadir al pedido' : '¡Pide ya!'}
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Carta;