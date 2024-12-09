// Array para almacenar las tareas
let tasks = [];

// Función para mostrar el modal
function showModal(task = null) {
  const modalContainer = document.getElementById('modal-container');
  const modalTitle = document.getElementById('modal-title');
  const saveBtn = document.getElementById('saveBtn');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskDescriptionInput = document.getElementById('taskDescription');

  // Mostrar el modal
  modalContainer.style.display = 'flex';

  // Configurar el modal según si es tarea nueva o editar
  if (task) {
    modalTitle.textContent = 'Editar Tarea';
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    saveBtn.textContent = 'Guardar Cambios';
    saveBtn.onclick = function (event) {
      event.preventDefault();
      task.title = taskTitleInput.value;
      task.description = taskDescriptionInput.value;
      renderTasks();
      closeModal();
    };
  } else {
    modalTitle.textContent = 'Nueva Tarea';
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    saveBtn.textContent = 'Agregar Tarea';
    saveBtn.onclick = function (event) {
      event.preventDefault();
      const newTask = {
        title: taskTitleInput.value,
        description: taskDescriptionInput.value
      };
      tasks.push(newTask);
      renderTasks();
      closeModal();
    };
  }
}

// Función para cerrar el modal
function closeModal() {
  document.getElementById('modal-container').style.display = 'none';
}

// Función para renderizar la lista de tareas
function renderTasks() {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = ''; // Limpiar la lista de tareas

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <p>${task.description}</p>
      </div>
      <button class="btn-edit" data-index="${index}">Editar</button>
      <button class="btn-delete" data-index="${index}">Eliminar</button>
    `;
    taskList.appendChild(taskItem);

    // Vincular el botón de editar
    taskItem.querySelector('.btn-edit').addEventListener('click', function () {
      const taskIndex = this.getAttribute('data-index');
      showModal(tasks[taskIndex]); // Mostrar modal para editar
    });

    // Vincular el botón de eliminar
    taskItem.querySelector('.btn-delete').addEventListener('click', function () {
      const taskIndex = this.getAttribute('data-index');
      tasks.splice(taskIndex, 1); // Eliminar la tarea
      renderTasks(); // Re-renderizar la lista
    });
  });
}

// Vincular el botón de agregar nueva tarea
document.getElementById('addTask').addEventListener('click', () => {
  showModal(); // Mostrar el modal para agregar tarea
});

// Vincular el botón de cerrar modal
document.getElementById('closeModal').addEventListener('click', closeModal);

// Inicializar la renderización de tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});


// Obtener el botón de Cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');

// Agregar evento de clic para el botón de Cerrar sesión
logoutBtn.addEventListener('click', function() {
  // Aquí puedes agregar la lógica para cerrar sesión
  // Por ejemplo, eliminar datos de sesión o redirigir a otra página

  // Redirigir a la página de login (suponiendo que tengas una página de login)
  window.location.href = 'index.html'; // Cambia a la URL de tu página de login
});
