import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../assets/css/auth.css';

const traducirError = (msg) => {
  const map = {
    "validation.required":         "Este campo es obligatorio.",
    "validation.email":            "Debe ser un correo electrónico válido.",
    "validation.min.string":       "Debe tener al menos 8 caracteres.",
    "validation.max.string":       "Demasiados caracteres.",
    "validation.confirmed":        "Las contraseñas no coinciden.",
    "validation.unique":           "Este valor ya está en uso.",
    "These credentials do not match our records.": "Las credenciales no son correctas.",
  };
  return map[msg] ?? msg;
};

const MostrarErrores = ({ errores, campo }) =>
  errores[campo]?.length
    ? <ul className="errores-campo">
        {errores[campo].map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    : null;

function Registro() {
  const [nombre, setNombre]                     = useState("");
  const [email, setEmail]                       = useState("");
  const [telefono, setTelefono]                 = useState("");
  const [password, setPassword]                 = useState("");
  const [password_confirmation, setPaswordConf] = useState("");
  const [error, setError]                       = useState("");
  const [errores, setErrores]                   = useState({});

  const navigate          = useNavigate();
  const { iniciarSesion } = useAuth();

  const registrarseSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrores({});

    try {
      const respuesta = await register({ nombre, email, telefono, password, password_confirmation });
      if (respuesta.token) {
        iniciarSesion(respuesta.token);
        navigate('/carta');
      } else {
        setError(traducirError(respuesta.message ?? "Error desconocido."));
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        const traducidos = {};
        for (const campo in data.errors) {
          traducidos[campo] = data.errors[campo].map(traducirError);
        }
        setErrores(traducidos);
      } else {
        setError(traducirError(data?.message ?? "Error al registrarse."));
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Registro</h1>

      {error && <p className="error-general">{error}</p>}

      <form onSubmit={registrarseSubmit}>
        <label>Nombre
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="nombre" />

        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="email" />

        <label>Teléfono
          <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="telefono" />

        <label>Contraseña
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="password" />

        <label>Repita la contraseña
          <input type="password" value={password_confirmation} onChange={e => setPaswordConf(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="password_confirmation" />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;