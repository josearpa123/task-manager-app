import { validateEmail, validatePassword } from './validation.js';

document.querySelector(".signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validación mejorada
  if (!name) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  if (!validatePassword(password)) {
    alert("La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    // Enviar los datos al servidor
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuario registrado con éxito.");
      window.location.href = "index.html"; // Redirigir a la pantalla de inicio de sesión
    } else if (response.status === 409) {
      alert("El correo ya está registrado.");
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Hubo un error al registrar el usuario. Por favor, intenta de nuevo.");
  }
});

// Helpers de validación (en validation.js)
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}