import { Task } from './components/Task.js';
import { Modal } from './components/Modal.js';
import { TaskManager } from './components/TaskManager.js';

export class App {
  constructor() {
    this.taskManager = new TaskManager();
    this.modal = new Modal(this.taskManager);
    this.setupEventListeners();
  }

  // Setup event listeners
  setupEventListeners() {
    const addTaskBtn = document.getElementById('addTask');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => {
        this.modal.showModal();
      });
    }

    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        this.modal.closeModal();
      });
    }

    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        if (title && description) {
          this.taskManager.addTask(new Task(title, description));
          this.modal.closeModal();
        } else {
          alert("Por favor, completa todos los campos de la tarea.");
        }
      });
    }
  }
}