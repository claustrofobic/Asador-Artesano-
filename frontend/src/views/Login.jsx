import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../assets/css/auth.css';

const traducirError = (msg) => {
  const map = {
    "validation.required":         "Este campo es obligatorio.",
    "validation.email":            "Debe ser un correo electrónico válido.",
    "validation.min.string":       "Debe tener al menos 8 caracteres.",
    "validation.confirmed":        "Las contraseñas no coinciden.",
    "validation.unique":           "Este valor ya está en uso.",
    "These credentials do not match our records.": "Las credenciales no son correctas.",
    "Too Many Attempts.":          "Demasiados intentos. Inténtalo más tarde.",
  };
  return map[msg] ?? msg;
};

const MostrarErrores = ({ errores, campo }) =>
  errores[campo]?.length
    ? <ul className="errores-campo">
        {errores[campo].map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    : null;

function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [errores, setErrores]   = useState({});

  const navigate          = useNavigate();
  const { iniciarSesion } = useAuth();

  const iniciarSesionSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrores({});

    try {
      const respuesta = await login(email, password);
      if (respuesta.token) {
        iniciarSesion(respuesta.token, respuesta.usuario);
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
        setError(traducirError(data?.message ?? "Error al iniciar sesión."));
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      {error && <p className="error-general">{error}</p>}

      <form onSubmit={iniciarSesionSubmit}>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="email" />

        <label>Contraseña
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <MostrarErrores errores={errores} campo="password" />

        <button type="submit">Entrar</button>
      </form>

      <button id="btn-registro" type="button" onClick={() => navigate('/registro')}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default Login;