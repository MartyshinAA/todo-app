import React, { Component } from "react";
import  Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
    
  
  
  render () {
    const { description, todos, deleteTask, onDescriptionCompleted, onDescriptionEditing } = this.props;
    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <React.Fragment key={id}>
          <Task { ...itemProps }
                deleteTask={ () => deleteTask(id) }
                onDescriptionCompleted={ () => onDescriptionCompleted(id) }
                onDescriptionEditing={ () => onDescriptionEditing(id) }
                editTodoElement={ () => this.editingValueDescription(description) }
                />
        </React.Fragment>
      )
    })
    
    return (
      <div className="task-list">
        <ul className="todo-list">
          { elements }
        </ul>
      </div>
    )
  }
}