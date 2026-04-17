import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { setPedido } from '../services/api';
import { useState } from 'react';
import '../assets/css/Carrito.css';

// ── Modal de aviso reutilizable ──────────────────────────
function Modal({ mensaje, onCerrar }) {
    return (
        <div className="modal-overlay">
            <div className="modal-aviso">
                <p>{mensaje}</p>
                <button className="btn-ok" onClick={onCerrar}>OK</button>
            </div>
        </div>
    );
}

// ── Carrito flotante ─────────────────────────────────────
function Carrito() {
    const { carrito, vaciarCarrito } = useCarrito();
    const { token } = useAuth();
    const [mostrarResumen, setMostrarResumen] = useState(false);
    const [modal, setModal] = useState(null);

    // no se muestra si no hay sesión o carrito vacío
    if (!token || carrito.length === 0) return null;

    const total = carrito.reduce((acc, plato) => acc + parseFloat(plato.precio), 0);

    const confirmarPedido = async () => {
        const platos_ids = carrito.map(plato => plato.id);
        await setPedido(platos_ids);
        vaciarCarrito();
        setMostrarResumen(false);
        setModal('¡Pedido confirmado! Puedes ver el estado en Mis pedidos.');
    };

    return (
        <>
            {/* Modal de aviso */}
            {modal && <Modal mensaje={modal} onCerrar={() => setModal(null)} />}

            {/* Barra flotante inferior */}
            <div className="carrito-barra">
                <span>
                    🛒 {carrito.length} {carrito.length === 1 ? 'plato' : 'platos'} — {total.toFixed(2)} €
                </span>
                <button className="btn-finalizar" onClick={() => setMostrarResumen(true)}>
                    Finalizar pedido
                </button>
            </div>

            {/* Modal resumen del pedido */}
            {mostrarResumen && (
                <div className="modal-overlay">
                    <div className="modal-resumen">
                        <h2>Resumen del pedido</h2>
                        {carrito.map((plato, index) => (
                            <div key={index} className="modal-resumen-fila">
                                <span>{plato.nombre}</span>
                                <span>{parseFloat(plato.precio).toFixed(2)} €</span>
                            </div>
                        ))}
                        <p className="modal-resumen-total">Total: {total.toFixed(2)} €</p>
                        <div className="modal-resumen-botones">
                            <button className="btn-volver" onClick={() => setMostrarResumen(false)}>
                                Volver
                            </button>
                            <button className="btn-confirmar" onClick={confirmarPedido}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Carrito;