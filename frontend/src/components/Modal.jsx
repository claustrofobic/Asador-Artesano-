export default function Modal({ mensaje, onCerrar }) {
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