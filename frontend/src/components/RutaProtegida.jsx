import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function RutaProtegida({ children }) {
    const { token } = useAuth();
    //si no hay token (si no hay un usuario logueado, redirige al login)
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default RutaProtegida