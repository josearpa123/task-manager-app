// scripts/main.js

import { Task } from '../../src/components/Task.js';  // Importa la clase Task
import { TaskManager } from '../../src/components/TaskManager.js';  // Importa la clase TaskManager
import { Modal } from '../../src/components/Modal.js';  // Importa la clase Modal
import { App } from '../../src/app.js';  // Importa la clase App

// Crear instancia de TaskManager
const taskManager = new TaskManager();

// Referencias a elementos del DOM
const addTaskBtn = document.getElementById('addTask');
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('closeModal');
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskList = document.querySelector('.task-list');

// Variables para editar
let editingTaskIndex = null; // Almacena el índice de la tarea que estamos editando

// Mostrar modal para agregar nueva tarea
addTaskBtn.addEventListener('click', () => {
  modalContainer.style.display = 'block';
  document.getElementById('modal-title').textContent = 'Nueva Tarea';
  taskTitle.value = '';  // Limpiar campos
  taskDescription.value = '';
  editingTaskIndex = null;  // No estamos editando ninguna tarea
});

// Cerrar el modal
closeModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});

// Manejar el envío del formulario (agregar o editar tarea)
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTask = new Task(taskTitle.value, taskDescription.value);

  if (editingTaskIndex !== null) {
    // Si estamos editando una tarea existente, actualizamos esa tarea
    taskManager.editTask(editingTaskIndex, newTask);
  } else {
    // Si estamos agregando una tarea nueva
    taskManager.addTask(newTask);
  }

  taskTitle.value = '';
  taskDescription.value = '';
  modalContainer.style.display = 'none';  // Cerrar modal

  // Volver a renderizar las tareas
  renderTasks();
});

// Función para mostrar las tareas en la lista
function renderTasks() {
  const tasks = taskManager.getAllTasks();
  taskList.innerHTML = ''; // Limpiar la lista antes de renderizar
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.id = index; // Asignamos el índice como ID de la tarea

    li.innerHTML = `
      <span class="task-title">${task.title}</span>
      <span class="task-description">${task.description}</span>
      <button class="edit-task">Editar</button>
      <button class="delete-task">Eliminar</button>
    `;

    // Agregar eventos para los botones de editar y eliminar
    li.querySelector('.edit-task').addEventListener('click', () => {
      // Llenamos el modal con los datos de la tarea para editarla
      taskTitle.value = task.title;
      taskDescription.value = task.description;
      document.getElementById('modal-title').textContent = 'Editar Tarea';
      modalContainer.style.display = 'block';

      // Establecer la tarea a editar
      editingTaskIndex = index;
    });

    li.querySelector('.delete-task').addEventListener('click', () => {
      // Eliminar la tarea
      taskManager.deleteTask(index);
      renderTasks(); // Volver a renderizar la lista
    });

    taskList.appendChild(li);
  });
}

// Inicializamos la lista de tareas
renderTasks();

// Obtener el botón de Cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');

// Agregar evento de clic para el botón de Cerrar sesión
logoutBtn.addEventListener('click', function() {
  // Aquí puedes agregar la lógica para cerrar sesión
  // Por ejemplo, eliminar datos de sesión o redirigir a otra página

  // Redirigir a la página de login (suponiendo que tengas una página de login)
  window.location.href = 'index.html'; // Cambia a la URL de tu página de login
});
