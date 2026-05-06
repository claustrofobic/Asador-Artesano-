// URL base de la API de Laravel
const API_URL = "http://localhost:8000/api";

// función para hacer las peticiones a la API
//endpoint-> la del url después de /api
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // se va a mandar un json
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // si hay token lo añadimos
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  //se manda el url + endpoint con sus opciones y sus headers (con token, o null)
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: headers,
    ...options,
  });

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  return response.json();
};

/* PETICIONES POST */


// petición POST a /api/login
export const login = (email, password) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

// petición POST a /api/registro
export const register = (datos) =>
  request("/registro", {
    method: "POST",
    body: JSON.stringify(datos),
  });

// petición POST a /api/mis-pedidos
export const setPedido = (items, horaRecogida, medioPago) =>
  request("/mis-pedidos", {
    method: "POST",
    body: JSON.stringify({
      items,
      hora_recogida: horaRecogida,
      medio_pago: medioPago,
    }),
  });


// peticion POST a /api/favoritos
export const setFavorito = (platoId) =>
  request("/favoritos", {
    method: "POST",
    body: JSON.stringify({ plato_id: platoId }),
  });

export const setPlato = (datos) =>
  request("/admin/platos", {
    method: "POST",
    body: JSON.stringify(datos),
  });


/* PETICIONES GET */
// petición GET a /api/platos
export const getPlatos = () => request("/platos");
// petición GET a /api/platos/{id}
export const getPlato = (id) => request(`/admin/platos/${id}`);
// petición GET a /api/favoritos
export const getFavoritos = () => request("/favoritos");

// petición GET a /api/mis-pedidos
export const getMisPedidos = () => request("/mis-pedidos");

export const getPedidosAdmin = () => request("/admin/pedidos");

export const getCategorias = () => request("/admin/categorias");

export const getAlergenos = () => request("/admin/alergenos");


/* PETICIONES DELETE */
// petición DELETE a /api/favoritos/{id}
export const deleteFavorito = (id) =>
  request(`/favoritos/${id}`, {
    method: "DELETE",
  });

export const deletePlato = (id) =>
  request(`/admin/platos/${id}`, {
    method: "DELETE",
  });

/* PETICIONES PUT */
export const updateEstadoPedido = (id, estado) =>
  request(`/pedidos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });

export const updatePlato = (id, datos) =>
  request(`/admin/platos/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
