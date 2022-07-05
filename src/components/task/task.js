import { Component } from 'react';
import './task.css';

export default class Task extends Component {
  
  render() {
    // console.log(this.props);  
    const { description, completed, editing, created, onDescriptionCompleted, deleteTask } = this.props;
    // const status = 'editing';
    // let classNames = 'editing';
    let classNames = 'task';
    if (completed) {
      classNames +=` completed`;
    }
    if (editing) {
      classNames +=` editing`;
    }

    return (
        <li className={ classNames }>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span 
                className = "description"
                onClick = { onDescriptionCompleted }
                >{ description }
                </span>
                <span className="created">{ created }</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"
              onClick={ deleteTask }></button>
            </div>
            {editing && <input type="text" class="edit" value="Editing task"></input>}
          </li>
    )
  }
};