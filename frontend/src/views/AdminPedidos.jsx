import { useState, useEffect } from 'react';
import { getPedidosAdmin, updateEstadoPedido, descargarPedidoPdf } from '../services/api';
import '../assets/css/pedidos.css';

function AdminPedidos() {
    const [mis_pedidos, setMisPedidos] = useState([]);

    useEffect(() => {
        const cargarMisPedidos = async () => {
            const datos = await getPedidosAdmin();
            setMisPedidos(datos);
        };
        cargarMisPedidos();
    }, []);

    const actualizarEstado = async (pedidoId, nuevoEstado) => {
        await updateEstadoPedido(pedidoId, nuevoEstado);
        const datos = await getPedidosAdmin();
        setMisPedidos(datos);
    };


    return (
        <div className="pedidos-container">
            <h1>Mis Pedidos</h1>
            {mis_pedidos.length === 0 ? (
                <p>Todavía no tienes pedidos.</p>
            ) : (
                mis_pedidos.map(pedido => (
                    <div key={pedido.id} className="tarjeta-pedido">
                        <h2>Pedido #{pedido.id}</h2>
                        <button className="btn-accion" onClick={() => descargarPedidoPdf(pedido.id)}>
                            Descargar detalles del pedido
                        </button>
                        <p>Cliente: {pedido.usuario.nombre}</p>
                        
                        {pedido.estado === 'pendiente' ? (<button className="btn-accion" onClick={() => actualizarEstado(pedido.id, 'recibido')}>Marcar como Recibido</button>) : (<span className="badge-recibido">PEDIDO YA RECIBIDO</span>)}
                        <p>Fecha: {new Date(pedido.created_at).toLocaleDateString('es-ES')}</p>
                        <p>Total: {pedido.total} €</p>
                        {pedido.items.map(item => (
                            <div key={item.id} className="item-pedido">
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



export default AdminPedidos