// TaskManager.js

export class TaskManager {
    constructor() {
      this.tasks = []; // Lista de tareas
    }
  
    // Agregar nueva tarea
    addTask(task) {
      this.tasks.push(task);
    }
  
    // Obtener todas las tareas
    getAllTasks() {
      return this.tasks;
    }
  
    // Editar tarea
    editTask(index, updatedTask) {
      if (this.tasks[index]) {
        this.tasks[index] = updatedTask;
      }
    }
  
    // Eliminar tarea
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  }
  