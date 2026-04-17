import {useState, useEffect } from 'react';
import { getMisPedidos } from '../services/api';

function MisPedidos() {
    const [mis_pedidos, setMisPedidos] = useState([]);

    useEffect(() => {
        const cargarMisPedidos = async () =>{
            const datos = await getMisPedidos();
            setMisPedidos(datos);
        };
        cargarMisPedidos();
    }, []);

    return (
        <div>
            <h1>Mis Pedidos</h1>
            {mis_pedidos.length === 0 ? (
                <p>Todavía no tienes pedidos.</p>
            ) : (
                mis_pedidos.map(pedido => (
                    <div key={pedido.id}>
                        <h2>Pedido #{pedido.id}</h2>
                        <p>Estado: {pedido.estado}</p>
                        <p>Fecha: {new Date(pedido.created_at).toLocaleDateString('es-ES')}</p>
                        <p>Total: {pedido.total} €</p>
                        {pedido.items.map(item => (
                            <div key={item.id}>
                                <p>{item.plato.nombre}</p>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Precio: {item.precio_unitario} €</p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default MisPedidos