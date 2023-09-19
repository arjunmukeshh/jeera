import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/AddProjectPopup.css'
const EditTaskPopup = ({ isOpen, onClose, onUpdateTask, taskToEdit }) => {
  const [name, setName] = useState(taskToEdit.name);
  const [description, setDescription] = useState(taskToEdit.description);
  const [status, setStatus] = useState(taskToEdit.status);
  const [priority, setPriority] = useState(taskToEdit.priority);
  
  console.log("here")
  const handleUpdateTask = () => {
    onUpdateTask({
      ...taskToEdit,
      name,
      description,
      status,
      priority,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Task"
      className="modal"
    >
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Task</p>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Priority</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={handleUpdateTask}
          >
            Save
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default EditTaskPopup;
