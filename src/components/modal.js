export function showModal(task = null) {
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal">
          <h2>${task ? "Editar Tarea" : "Nueva Tarea"}</h2>
          <form id="taskForm">
            <div class="form-group">
              <label for="taskName">Nombre de la Tarea</label>
              <input type="text" id="taskName" value="${task ? task.name : ""}" required>
            </div>
            <button type="submit" class="btn-save">${task ? "Guardar Cambios" : "Agregar Tarea"}</button>
          </form>
          <button id="closeModal" class="btn-close">Cerrar</button>
        </div>
      </div>
    `;
  
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  
    // Event listeners para cerrar el modal
    document.getElementById("closeModal").addEventListener("click", () => {
      document.querySelector(".modal-overlay").remove();
    });
  }
  