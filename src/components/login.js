// Función para manejar el evento de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    // Obtener valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Lógica de autenticación (ejemplo usando Firebase)
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
  
      // Redirigir al dashboard
      window.location.href = "/dashboard.html";
    } catch (error) {
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.style.display = "block";
      errorMessage.textContent = "Correo o contraseña incorrectos.";
    }
  });
  