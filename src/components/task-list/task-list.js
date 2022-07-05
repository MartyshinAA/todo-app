import React, { Component } from "react"
import  Task from '../task/task'
import './task-list.css'

export default class TaskList extends Component {
    
  
  render () {
    const { todos, deleteTask, onDescriptionCompleted } = this.props;
    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <React.Fragment key={id}>
          <Task { ...itemProps }
                deleteTask={ () => deleteTask(id) }
                onDescriptionCompleted={ () => onDescriptionCompleted(id) }/>
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