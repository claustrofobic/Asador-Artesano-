// URL base de la API de Laravel
const API_URL = "http://localhost:8000/api";

// función para hacer las peticiones a la API
//endpoint-> la del url después de /api
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: headers,
    ...options,
  });

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return null;
  }

  const data = await response.json();

  // si la respuesta no es ok  lanzamos el error con los datos
  if (!response.ok) {
    const error = new Error(data?.message ?? "Error en la petición");
    error.response = { data, status: response.status };
    throw error;
  }

  return data;
};

/* ===============
  PETICIONES POST 
================ */


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


export const setPlato = (datos) => {
    const token = localStorage.getItem("token");
    return fetch(`${API_URL}/admin/platos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            // sin Content-Type, el browser lo pone solo con el boundary correcto
        },
        body: datos, // FormData directo, sin JSON.stringify
    }).then(res => res.json());
};


export const setAlergeno = (datos) =>
  request("/admin/alergenos", {
    method: "POST",
    body: JSON.stringify(datos),
  });


/* =======================
      PETICIONES GET 
=======================   */

// petición GET a /api/platos
export const getPlatos = () => request("/platos");

// petición GET a /api/platos/{id}
export const getPlato = (id) => request(`/admin/platos/${id}`);

// petición GET a /api/favoritos
export const getFavoritos = () => request("/favoritos");

// petición GET a /api/mis-pedidos
export const getMisPedidos = () => request("/mis-pedidos");

// petición GET a /api/admin/pedidos
export const getPedidosAdmin = () => request("/admin/pedidos");

// petición GET a /api/admin/categorias
export const getCategorias = () => request("/admin/categorias");

// petición GET a /api/admin/alergenos
export const getAlergenos = () => request("/admin/alergenos");

// petición GET a /api/admin/estadisticas
export const getEstadisticas = () => request("/admin/estadisticas");

// petición GET a /api/pedidos/{id}/pdf para descargar el PDF del pedido
export const descargarPedidoPdf = async (id) => {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/pedidos/${id}/pdf`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al generar el PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedido-${id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
};


/* ==================
  PETICIONES DELETE 
  =================*/

// petición DELETE a /api/favoritos/{id}
export const deleteFavorito = (id) =>
  request(`/favoritos/${id}`, {
    method: "DELETE",
  });

// petición DELETE a /api/admin/platos/{id}
export const deletePlato = (id) =>
  request(`/admin/platos/${id}`, {
    method: "DELETE",
  });


// petición DELETE a /api/admin/alergenos/{id}
export const deleteAlergeno = (id) =>
  request(`/admin/alergenos/${id}`, {
    method: "DELETE",
  });



/*==================
 PETICIONES PUT 
 ====================*/

 // petición PUT a /api/pedidos/{id} para actualizar el estado del pedido
export const updateEstadoPedido = (id, estado) =>
  request(`/pedidos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });

  // petición PUT a /api/admin/platos/{id} para actualizar un plato, usando FormData para poder enviar imagen
export const updatePlato = (id, datos) => {
    const token = localStorage.getItem("token");
    return fetch(`${API_URL}/admin/platos/${id}`, {
        method: "POST", // POST con _method=PUT porque Laravel no lee FormData en PUT
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: datos, // formData directo
    }).then(res => res.json());
};

// petición PUT a /api/admin/alergenos/{id}
export const updateAlergeno = (id, datos) =>
  request(`/admin/alergenos/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });