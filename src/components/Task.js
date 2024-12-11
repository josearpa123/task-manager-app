export class Task {
  // Definir los posibles estados como constantes
  static VALID_STATUSES = ['pending', 'in-progress', 'completed'];

  constructor(title, description, id = null) {
    if (!title || !description) {
      throw new Error('Title and description are required');
    }

    this.id = id || this.generateUniqueId();
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toISOString(); // Usar ISOString para consistencia
    this.status = 'pending'; // Default status
  }

  // Generate a unique ID if not provided
  generateUniqueId() {
    return 'task-' + Math.random().toString(36).substr(2, 9);
  }

  // Method to update task details
  update(title, description) {
    if (!title || !description) {
      throw new Error('Title and description are required');
    }

    this.title = title;
    this.description = description;
  }

  // Method to change task status
  changeStatus(newStatus) {
    if (!Task.VALID_STATUSES.includes(newStatus)) {
      console.error(`Invalid status: ${newStatus}. Valid statuses are: ${Task.VALID_STATUSES.join(', ')}`);
      return;
    }
    this.status = newStatus;
  }

  // Convert task to JSON for storage or transmission
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      status: this.status
    };
  }
}