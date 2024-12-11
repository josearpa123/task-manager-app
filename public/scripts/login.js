document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  // Validación de campos vacíos
  if (!email || !password) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Por favor, ingresa tu correo y contraseña.";
    return;
  }

  // Validación del formato del email
  if (!validateEmail(email)) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
    return;
  }

  try {
    // Realizar la autenticación
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    // Verificar si la respuesta es exitosa
    const data = await response.json();

    if (response.ok) {
      // Si la respuesta es exitosa, guardar el token y redirigir al usuario
      localStorage.setItem('userToken', data.token);
      window.location.href = "task.html";  // Redirigir a la página de tareas
    } else {
      // Si la respuesta es un error, mostrar el mensaje de error
      console.error("Error en respuesta del servidor:", data); // Agregado para depuración
      errorMessage.style.display = "block";
      errorMessage.textContent = data.message || "Error de inicio de sesión. Intenta de nuevo.";
    }
  } catch (error) {
    // Capturar errores de red o problemas con la API
    console.error('Login error:', error);  // Agregado para depuración
    errorMessage.style.display = "block";
    errorMessage.textContent = "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo.";
  }
});

// Función para validar el correo electrónico
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para mostrar u ocultar la contraseña
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const togglePassword = document.createElement('span');
  togglePassword.innerHTML = '👁️';
  togglePassword.style.position = 'absolute';
  togglePassword.style.right = '10px';
  togglePassword.style.cursor = 'pointer';
  
  passwordInput.parentNode.style.position = 'relative';
  passwordInput.parentNode.appendChild(togglePassword);

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });
});