/

//   para q los errores salgan en español
const traducciones = {
  "validation.required": "Este campo es obligatorio.",
  "validation.email": "Debe ser un correo electrónico válido.",
  "validation.min.string": "Debe tener al menos :min caracteres.",
  "validation.max.string": "No debe tener más de :max caracteres.",
  "validation.confirmed": "La confirmación no coincide.",
  "validation.unique": "Ya está en uso.",
  "These credentials do not match our records.": "Las credenciales no son correctas.",
  "Too Many Attempts.": "Demasiados intentos. Inténtalo más tarde.",
};

export const traducirError = (mensaje) => {
  return traducciones[mensaje] ?? mensaje;
};

export const traducirErrores = (errors) => {
  const resultado = {};
  for (const campo in errors) {
    resultado[campo] = errors[campo].map(traducirError);
  }
  return resultado;
};