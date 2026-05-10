import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo  from '../assets/img/logoAsadorArtesano.png';
import '../assets/css/navbar.css';

function Navbar() {
    //saca el token del contexto directamente
    const {token, cerrarSesion } = useAuth();
    /* cabecera con los links.. si existe token (si hay usuario logueado)
    muestra una cosa u otra : /carta | /login & Mis pedidos | Login */
    const navigate = useNavigate();
    

    const cerrarSesionBtn= () => {
    cerrarSesion();
    navigate('/');
};

    return (
        <div id="cabeceraContainer">
        <nav>
            <img src={logo} alt="Logo Asador Artesano" />
            <div className="cabecera-item">
            <Link to="/">Inicio</Link>
            </div>
            <div className="cabecera-item">
            <Link to="/quienes-somos">Quiénes Somos</Link>
            </div>
            <div className="cabecera-item">
            <Link to="/carta">Carta</Link>
            </div>
            <div className="cabecera-item">
            <button>
                {token ? (
                    <Link to="/carta"> Haz tu pedido</Link>
                ) : (
                    <Link to="/login"> Haz tu pedido</Link>
                )}
                </button>
                </div>
                <div className="cabecera-item">
            {token ? (
                <Link to="/mis-pedidos">Mis pedidos</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
            </div>
            <div className="cabecera-item">
                {token && (
            <button onClick={cerrarSesionBtn}>Cerrar Sesión</button>
            )}
            </div>
        </nav>
        </div>
    )
}

export default Navbar