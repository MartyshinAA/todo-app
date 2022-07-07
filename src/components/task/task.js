import { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    description: 'New Task',
    completed: false,
    editing: false,
    created: 'created some time ago',
  };

  static propsTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    created: PropTypes.string,
    onDescriptionCompleted: PropTypes.func.isRequired,
    onDescriptionEditing: PropTypes.func.isRequired,
    deleteTodoElement: PropTypes.func.isRequired,
  };

  state = {
    description: this.props.description,
  };

  onSubmitEditing = (e) => {
    e.preventDefault();
    this.props.onDescriptionEditing(this.state.description);
  };

  editTodoElement = (e) => {
    this.props.editTodoElement(e);
  };

  render() {
    const {
      description,
      completed,
      editing,
      created,
      onDescriptionCompleted,
      onDescriptionEditing,
      deleteTodoElement,
    } = this.props;

    let classNames = 'task';
    if (completed) {
      classNames += ` completed`;
    }
    if (editing) {
      classNames += ` editing`;
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onDescriptionCompleted}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={onDescriptionEditing}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={deleteTodoElement}
          ></button>
        </div>
        {editing && (
          <form onSubmit={this.onSubmitEditing}>
            <input
              type="text"
              className="edit"
              // В задании не было реализовать функцию редактирования, но для учебного проекта пусть будет. Впредь подобного обязуюсь не совершать.
              onChange={this.editTodoElement}
              value={description}
            ></input>
          </form>
        )}
      </li>
    );
  }
}
