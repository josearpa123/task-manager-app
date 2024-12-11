import { Task } from '/src/components/Task.js'; // Asegúrate de que la ruta sea correcta
import { TaskManager } from '/src/components/TaskManager.js'; // Asegúrate de que la ruta sea correcta
import { Modal } from '/src/components/Modal.js'; // Asegúrate de que la ruta sea correcta

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('userToken')) {
    window.location.href = 'index.html'; // Redirigir a login si no hay token
  }

  const taskManager = new TaskManager();
  const modal = new Modal(taskManager);

  const taskList = document.querySelector('.task-list');
  const addTaskBtn = document.getElementById('addTask');
  const modalContainer = document.getElementById('modal-container');
  const closeModalBtn = document.getElementById('closeModal');
  const taskForm = document.getElementById('taskForm');
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');

  // Verificar que los elementos existen
  if (!addTaskBtn || !modalContainer || !closeModalBtn || !taskForm || !taskTitle || !taskDescription || !taskList) {
    console.error('Error: No se encuentran todos los elementos del DOM');
    return;
  }

  let editingTaskId = null; // Identificador de la tarea que estamos editando

  // Mostrar modal para agregar nueva tarea
  addTaskBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex'; // Mostrar el modal
    document.getElementById('modal-title').textContent = 'Nueva Tarea';
    taskTitle.value = ''; // Limpiar campos
    taskDescription.value = '';
    editingTaskId = null; // Resetear el modo de edición
  });

  // Cerrar el modal
  closeModalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });

  // Manejar el envío del formulario (agregar o editar tarea)
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (!title || !description) {
      alert('Por favor, ingresa tanto el título como la descripción de la tarea.');
      return;
    }

    if (editingTaskId !== null) {
      // Editar tarea existente
      taskManager.editTask(editingTaskId, new Task(title, description, editingTaskId));
    } else {
      // Agregar nueva tarea sin validación de duplicados
      taskManager.addTask(new Task(title, description));
    }

    modalContainer.style.display = 'none'; // Cerrar modal
    renderTasks(); // Renderizar lista de tareas
  });

  function renderTasks() {
    const tasks = taskManager.getAllTasks();
    taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

    if (tasks.length === 0) {
      taskList.innerHTML = '<li class="task-list-placeholder">No hay tareas. ¡Comienza agregando una!</li>';
      return;
    }

    tasks.forEach((task) => {
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
        editingTaskId = task.id; // Almacenar el ID para editar
      });

      li.querySelector('.delete-task').addEventListener('click', () => {
        taskManager.deleteTask(task.id); // Eliminar tarea
        renderTasks(); // Volver a renderizar
      });

      taskList.appendChild(li);
    });
  }

  // Inicializar tareas al cargar la página
  renderTasks();

  // Botón de cerrar sesión
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
  });
});