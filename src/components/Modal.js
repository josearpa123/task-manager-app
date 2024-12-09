// components/Modal.js
export class Modal {
    constructor(taskManager) {
      this.taskManager = taskManager;
    }
  
    showModal() {
      const modal = document.getElementById('modal-container');
      modal.style.display = 'block';  // Muestra el modal
    }
  
    closeModal() {
      const modal = document.getElementById('modal-container');
      modal.style.display = 'none';  // Cierra el modal
    }
  }
  