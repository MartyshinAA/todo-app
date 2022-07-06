import { Component } from 'react';
import './task.css';

export default class Task extends Component {

  state = {
    description: this.props.description
  }
  
  onSubmitEditing = event => {
    event.preventDefault();
    this.props.onDescriptionEditing(this.state.description); 
  }

  descriptionEdit = event => {
    // console.log(this.state.description);
    this.setState({
      description: event.target.value
    });
    // this.props.editTodoElement(event.target.value)
  }

  render() {
    const { completed, editing, created, onDescriptionCompleted, onDescriptionEditing, deleteTask } = this.props;
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
              <input 
                className="toggle" 
                type="checkbox" 
                onClick = { onDescriptionCompleted }
                />
              <label>
                <span 
                className = "description"
                >{ this.state.description } {/* Понимаю, так не меняем состояние основного связывающего компонента App (видимо это что-то про хуки), да и в задании не было про реализацию редактирования). Сделал для красоты */}
                </span>
                <span className="created">{ created }</span>
              </label>
              <button className="icon icon-edit"
                      onClick = { onDescriptionEditing }></button>
              <button className="icon icon-destroy"
              onClick={ deleteTask }></button>
            </div>
            {editing && <form onSubmit = { this.onSubmitEditing }>
                          <input type="text" 
                                  className="edit" 
                                  onChange = { this.descriptionEdit }
                                  value={ this.state.description }
                                  ></input>
                        </form>} 
          </li>
    )
  }
};