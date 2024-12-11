import { Task } from '../../src/components/Task.js'; // Asegúrate de que la ruta sea correcta
import { TaskManager } from '../../src/components/TaskManager.js'; // Asegúrate de que la ruta sea correcta
import { Modal } from '../../src/components/Modal.js'; // Asegúrate de que la ruta sea correcta

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('userToken')) {
    window.location.href = 'index.html'; // Redirigir a login si no hay token
  }

  const taskManager = new TaskManager();
  const modalContainer = document.getElementById('modal-container');
  const taskForm = document.getElementById('taskForm');
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');
  const taskList = document.querySelector('.task-list');
  let editingTaskId = null;

  // Mostrar modal para agregar nueva tarea
  document.getElementById('addTask').addEventListener('click', () => {
    modalContainer.style.display = 'flex';
    document.getElementById('modal-title').textContent = 'Nueva Tarea';
    taskTitle.value = '';
    taskDescription.value = '';
    editingTaskId = null;
  });

  // Cerrar el modal
  document.getElementById('closeModal').addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });

  // Lógica centralizada del formulario
  function handleTaskFormSubmit(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (!title || !description) {
      alert('Por favor, ingresa tanto el título como la descripción de la tarea.');
      return;
    }

    if (editingTaskId !== null) {
      taskManager.editTask(editingTaskId, new Task(title, description, editingTaskId));
    } else {
      const newTask = new Task(title, description);
      taskManager.addTask(newTask);

      // Insertar la nueva tarea en la parte superior de la lista
      taskManager.tasks.unshift(newTask); // Inserta la nueva tarea al inicio
    }

    modalContainer.style.display = 'none';
    renderTasks();
  }

  taskForm.removeEventListener('submit', handleTaskFormSubmit);
  taskForm.addEventListener('submit', handleTaskFormSubmit);

  // Función para renderizar tareas
  function renderTasks() {
    const tasks = taskManager.getAllTasks();
    taskList.innerHTML = '';

    if (tasks.length === 0) {
      taskList.innerHTML = '<li class="task-list-placeholder">No hay tareas. ¡Comienza agregando una!</li>';
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.dataset.id = task.id;

      li.innerHTML = `
        <span class="task-title">${task.title}</span>
        <span class="task-description">${task.description}</span>
        <button class="edit-task">Editar</button>
        <button class="delete-task">Eliminar</button>
      `;

      li.querySelector('.edit-task').addEventListener('click', () => {
        taskTitle.value = task.title;
        taskDescription.value = task.description;
        document.getElementById('modal-title').textContent = 'Editar Tarea';
        modalContainer.style.display = 'flex';
        editingTaskId = task.id;
      });

      li.querySelector('.delete-task').addEventListener('click', () => {
        taskManager.deleteTask(task.id);
        renderTasks();
      });

      // Insertar la tarea en la parte superior de la lista
      taskList.insertBefore(li, taskList.firstChild);
    });
  }

  // Renderizar tareas iniciales
  renderTasks();

  // Cerrar sesión
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
  });
});

const API_URL = "http://localhost:3000";

async function getUserInfo(token) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("userName").textContent = data.name;
      document.getElementById("userEmail").textContent = data.email;
    } else {
      console.error("Error al obtener información del usuario:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Simulación de inicio de sesión para obtener un token
(async function simulateLogin() {
  const loginResponse = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "123456" }),
  });

  if (loginResponse.ok) {
    const { token } = await loginResponse.json();
    localStorage.setItem("token", token);
    getUserInfo(token);
  } else {
    console.error("Error al iniciar sesión");
  }
})();
