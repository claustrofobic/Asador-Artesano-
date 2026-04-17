import { useState, createContext, useContext } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    // array de platos añadidos
    const [carrito, setCarrito] = useState([]);

    const añadirPlato = (plato) => {
        // añade el plato al array existente
        setCarrito(carritoActual => [...carritoActual, plato]);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, añadirPlato, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}

export const useCarrito = () => useContext(CarritoContext);