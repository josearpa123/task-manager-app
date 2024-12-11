import { Task } from './Task.js';  // Asegúrate de que la ruta sea correcta

export class Modal {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.modalContainer = document.getElementById('modal-container');
    this.taskTitle = document.getElementById('taskTitle');
    this.taskDescription = document.getElementById('taskDescription');
    this.modalTitle = document.getElementById('modal-title');
    this.initializeEventListeners();
  }

  // Initialize event listeners for modal buttons
  initializeEventListeners() {
    const closeModalBtn = document.getElementById('closeModal');
    const saveBtn = document.getElementById('saveBtn');

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => this.closeModal());
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveTask());
    }

    // Close the modal when pressing the 'Esc' key
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && this.modalContainer.style.display === "flex") {
        this.closeModal();
      }
    });
  }

  // Show modal, either for a new task or editing an existing one
  showModal(task = null) {
    this.modalContainer.style.display = 'flex';

    if (task) {
      this.modalTitle.textContent = 'Editar Tarea';
      this.taskTitle.value = task.title;
      this.taskDescription.value = task.description;
    } else {
      this.modalTitle.textContent = 'Nueva Tarea';
      this.taskTitle.value = '';
      this.taskDescription.value = '';
    }

    this.taskTitle.focus();
  }

  // Close modal
  closeModal() {
    this.modalContainer.style.display = 'none';
  }

  // Save the task (either create a new task or update an existing one)
  saveTask() {
    const title = this.taskTitle.value.trim();
    const description = this.taskDescription.value.trim();

    if (!title || !description) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const task = new Task(title, description);

    this.taskManager.addTask(task);  // Adds the task to TaskManager

    this.closeModal();

    // Trigger event to refresh the task list
    const event = new CustomEvent('taskAdded');
    document.dispatchEvent(event);
  }
}