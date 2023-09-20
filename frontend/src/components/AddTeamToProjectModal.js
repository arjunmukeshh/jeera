import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTeamModal = ({ isOpen, onClose, projectId, onAddTeam }) => {
  const [teamname, setteamname] = useState('');
  const [writeTasks, setWriteTasks] = useState("0");
  const [writeIssues, setWriteIssues] = useState("0");

  const handleAddTeam = () => {
    // Send a request to the API
    onAddTeam(projectId, { teamname, writeTasks, writeIssues });
    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Team</p>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Team Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Team Name"
                value={teamname}
                onChange={(e) => setteamname(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Write Tasks (0 for false, 1 for true)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Write Tasks"
                value={writeTasks}
                onChange={(e) => setWriteTasks(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Write Issues (0 for false, 1 for true)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Write Issues"
                value={writeIssues}
                onChange={(e) => setWriteIssues(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleAddTeam}>Add Team</button>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default AddTeamModal;
