// Función para manejar el evento de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lógica de autenticación simulada (puedes cambiar estos valores para probar)
    const validEmail = "test@example.com"; // Correo válido para pruebas
    const validPassword = "123456"; // Contraseña válida para pruebas

    // Verificar si los datos coinciden con los predefinidos
    if (email === validEmail && password === validPassword) {
        // Si las credenciales son correctas, redirige al dashboard
        window.location.href = "../public/task.html";
    } else {
        // Si las credenciales no son correctas, mostrar mensaje de error
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = "block";
        errorMessage.textContent = "Correo o contraseña incorrectos.";
    }

    // Código para Firebase (comentado para futuro)
    /*
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
    */
});

  