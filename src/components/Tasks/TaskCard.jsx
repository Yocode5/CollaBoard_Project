import React from 'react';
import './TaskCard.css';

const TaskCard = ({ 
  title = "Task Title", 
  status = "Completed", 
  assignee = "[Name]", 
  dueDate = "[dd/mm/yyyy]",
  onViewDetails
}) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      <hr className="task-divider" />
      
      <div className={`task-status status-${status.toLowerCase().replace(' ', '-')}`}>
        {status}
      </div>

      <div className="task-details">
        <div className="task-field">
          <label>Assignee:</label>
          <div className="task-input-mock">
            <i className="fa-solid fa-user icon"></i>
            <span className="text-truncate">{assignee}</span>
          </div>
        </div>

        <div className="task-field">
          <label>Due by:</label>
          <div className="task-input-mock">
             <i className="fa-solid fa-calendar-days icon"></i>
            <span>{dueDate}</span>
          </div>
        </div>
      </div>

      <div className="task-footer">
        <button className="view-details-link" onClick={onViewDetails}>
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;