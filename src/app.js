// components/App.jsq
import { TaskManager } from './components/TaskManager.js';
import { Modal } from './components/Modal.js';

export class App {
  constructor() {
    // Inicializa los componentes
    this.taskManager = new TaskManager();
    this.modal = new Modal(this.taskManager);

    // Configura los eventos de los botones
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Evento para agregar tarea
    document.getElementById('addTask').addEventListener('click', () => {
      this.modal.showModal();
    });

    // Evento para cerrar el modal
    document.getElementById('closeModal').addEventListener('click', () => {
      this.modal.closeModal();
    });

    // Evento para el formulario de tarea
    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;

      this.taskManager.addTask(title, description);
      this.modal.closeModal();  // Cierra el modal después de agregar la tarea
    });
  }
}
