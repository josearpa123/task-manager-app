document.querySelector(".signup-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevenir que el formulario se recargue

  // Capturar datos del formulario
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Verificar que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Enviar datos al servidor
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Usuario registrado con éxito");
      
      // Redirigir a la página task.html después de un registro exitoso
      window.location.href = "task.html";
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Error al registrar usuario");
  }
});
