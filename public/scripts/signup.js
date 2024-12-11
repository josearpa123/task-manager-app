document.querySelector(".signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtener los valores del formulario
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const errorMessage = document.getElementById("errorMessage");

  // Validación básica
  if (!name || !email || !password || !confirmPassword) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Todos los campos son obligatorios.";
    return;
  }

  // Validación de contraseñas
  if (password !== confirmPassword) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Las contraseñas no coinciden.";
    return;
  }

  // Validación del formato del correo
  if (!validateEmail(email)) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
    return;
  }

  // Enviar datos al servidor para crear el usuario
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      // Si el registro fue exitoso, redirigir al login
      alert("Usuario registrado exitosamente. Inicia sesión.");
      window.location.href = "index.html"; // Redirige al login
    } else {
      // Si la respuesta es un error, mostrar el mensaje de error
      console.error("Error en respuesta del servidor:", data);  // Agregado para depuración
      errorMessage.style.display = "block";
      errorMessage.textContent = data.message || "Error al registrar usuario. Intenta de nuevo.";
    }
  } catch (error) {
    // Capturar errores de red o problemas con la API
    console.error("Error al registrar usuario:", error);  // Agregado para depuración
    errorMessage.style.display = "block";
    errorMessage.textContent = "Ocurrió un error. Por favor, intenta de nuevo.";
  }
});

// Función para validar el formato del email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}