import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { setPedido } from "../services/api";
import { useState } from "react";
import "../assets/css/carrito.css";

function Modal({ mensaje, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-carrito" style={{ textAlign: "center" }}>
        <p
          style={{
            borderBottom: "none",
            fontSize: "1rem",
            color: "var(--color-texto)",
          }}
        >
          {mensaje}
        </p>
        <button className="btn-confirmar" onClick={onCerrar}>
          OK
        </button>
      </div>
    </div>
  );
}

function Carrito() {
  const { carrito, vaciarCarrito, eliminarPlato } = useCarrito();
  const { token } = useAuth();
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [horaRecogida, setHoraRecogida] = useState("");
  const [medioPago, setMedioPago] = useState('pago_en_local');
  const [modal, setModal] = useState(null);

  if (!token || carrito.length === 0) return null;

  const total = carrito.reduce(
    (acc, plato) => acc + parseFloat(plato.precio),
    0,
  );

  const confirmarPedido = async () => {
    if (!horaRecogida) {
      setModal("Por favor, elige una hora de recogida.");
      setMostrarResumen(false);
      return;
    }

    const items = carrito.map((plato) => ({
      plato_id: plato.id,
      cantidad: 1,
    }));

    await setPedido(items, horaRecogida, medioPago);

    vaciarCarrito();
    setHoraRecogida("");
    setMedioPago("local");
    setMostrarResumen(false);
    setModal("¡Pedido confirmado! Puedes ver el estado en Mis pedidos.");
  };

  return (
    <>
      {modal && <Modal mensaje={modal} onCerrar={() => setModal(null)} />}

      {/* Barra flotante */}
      <div className="carrito-flotante">
        <button className="btn-carrito" onClick={() => setMostrarResumen(true)}>
          {carrito.length} {carrito.length === 1 ? "plato" : "platos"} —{" "}
          {total.toFixed(2)} € · Finalizar pedido
        </button>
      </div>

      {/* Modal resumen */}
      {mostrarResumen && (
        <div className="modal-overlay">
          <div className="modal-carrito">
            <h2>Resumen del pedido</h2>
            {carrito.map((plato, index) => (
              <p key={index}>
                {plato.nombre}{" "}
                <span style={{ float: "right" }}>
                  {parseFloat(plato.precio).toFixed(2)} €
                </span>
                <button
                  className="btn-eliminar-plato"
                  onClick={() => eliminarPlato(plato.id)}
                >
                  Eliminar
                </button>
              </p>
            ))}
            <div>
              <label>Hora de recogida</label>
              <input
                type="datetime-local"
                value={horaRecogida}
                onChange={(e) =>
                  setHoraRecogida(e.target.value.replace("T", " ") + ":00")
                }
              />
            </div>

            <div>
              <label>Método de pago</label>
              <select
                value={medioPago}
                onChange={(e) => setMedioPago(e.target.value)}
              >
                <option value="pago_en_local">Pago en local</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="tpv_virtual">TPV virtual</option>
              </select>
            </div>
            <p className="total-carrito">
              Total <span style={{ float: "right" }}>{total.toFixed(2)} €</span>
            </p>
            <button className="btn-confirmar" onClick={confirmarPedido}>
              Confirmar pedido
            </button>
            <button
              className="btn-cerrar"
              onClick={() => setMostrarResumen(false)}
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Carrito;
