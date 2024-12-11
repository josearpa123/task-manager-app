import { Task } from './Task.js';  // Asegúrate de que la ruta sea correcta

export class TaskManager {
  constructor() {
    this.tasks = [];
    this.loadTasksFromLocalStorage();
  }

  // Add a new task
  addTask(task) {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  // Get all tasks
  getAllTasks() {
    return this.tasks;
  }

  // Edit task by ID
  editTask(taskId, updatedTask) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasksToLocalStorage();
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
  }

  // Delete task by ID
  deleteTask(taskId) {
    const filteredTasks = this.tasks.filter(task => task.id !== taskId);
    if (filteredTasks.length !== this.tasks.length) {
      this.tasks = filteredTasks;
      this.saveTasksToLocalStorage();
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
  }

  // Save tasks to local storage
  saveTasksToLocalStorage() {
    try {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } else {
        console.error("localStorage is not available in this browser.");
      }
    } catch (error) {
      console.error('Error saving tasks to local storage:', error);
    }
  }

  // Load tasks from local storage
  loadTasksFromLocalStorage() {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks).map(taskData => {
          // Check if the data is valid
          if (taskData && taskData.title && taskData.description) {
            const task = new Task(taskData.title, taskData.description, taskData.id);
            task.createdAt = new Date(taskData.createdAt);
            task.status = taskData.status || 'pending'; // Default value for status
            return task;
          } else {
            console.error("Invalid task data in localStorage:", taskData);
            return null;  // Don't add invalid tasks
          }
        }).filter(task => task !== null);  // Remove invalid tasks
      }
    } catch (error) {
      console.error('Error loading tasks from local storage:', error);
    }
  }
}