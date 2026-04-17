import { createContext, useState, useContext } from 'react';

// crea el contexto
const AuthContext = createContext();

// proveedor — envuelve toda la app y comparte el estado
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const iniciarSesion = (nuevoToken) => {
        localStorage.setItem('token', nuevoToken);
        setToken(nuevoToken);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);