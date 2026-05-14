import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { setPedido } from "../services/api";
import { useState } from "react";
import Modal from "./Modal";
import "../assets/css/carrito.css";

// Agrupa el array plano del carrito por id
const agruparItems = (items) => {
  const mapa = new Map();
  items.forEach((item) => {
    if (mapa.has(item.id)) {
      mapa.get(item.id).cantidad += 1;
    } else {
      mapa.set(item.id, { ...item, cantidad: 1 });
    }
  });
  return Array.from(mapa.values());
};

function Carrito() {
  const { carrito, vaciarCarrito, eliminarPlato } = useCarrito();
  const { token } = useAuth();
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [horaRecogida, setHoraRecogida] = useState("");
  const [medioPago, setMedioPago] = useState("pago_en_local");
  const [modal, setModal] = useState(null);

  if (!token || carrito.length === 0) return null;

  const itemsAgrupados = agruparItems(carrito);

  const total = itemsAgrupados.reduce(
    (acc, item) => acc + parseFloat(item.precio) * item.cantidad,
    0
  );

  const confirmarPedido = async () => {
    if (!horaRecogida) {
      setModal("Por favor, elige una hora de recogida.");
      setMostrarResumen(false);
      return;
    }

    // Enviamos ya con la cantidad real agrupada
    const items = itemsAgrupados.map((item) => ({
      plato_id: item.id,
      cantidad: item.cantidad,
    }));

    await setPedido(items, horaRecogida, medioPago);

    vaciarCarrito();
    setHoraRecogida("");
    setMedioPago("pago_en_local");
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

            {itemsAgrupados.map((item) => (
              <p key={item.id}>
                {item.cantidad > 1 && (
                  <span className="badge-cantidad">x{item.cantidad} </span>
                )}
                {item.nombre}
                <span style={{ float: "right" }}>
                  {(parseFloat(item.precio) * item.cantidad).toFixed(2)} €
                </span>
                <button
                  className="btn-eliminar-plato"
                  onClick={() => eliminarPlato(item.id)}
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
              Total{" "}
              <span style={{ float: "right" }}>{total.toFixed(2)} €</span>
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