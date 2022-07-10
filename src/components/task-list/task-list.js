import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTodoElement: PropTypes.func.isRequired,
    editTodoElement: PropTypes.func.isRequired,
    onDescriptionCompleted: PropTypes.func.isRequired,
    onDescriptionEditing: PropTypes.func.isRequired,
  };

  render() {
    const { todos, deleteTodoElement, editTodoElement, onDescriptionCompleted, onDescriptionEditing } = this.props;
    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <React.Fragment key={id}>
          <Task
            {...itemProps}
            deleteTodoElement={() => deleteTodoElement(id)}
            editTodoElement={(e) => editTodoElement(e, id)}
            onDescriptionCompleted={() => onDescriptionCompleted(id)}
            onDescriptionEditing={() => onDescriptionEditing(id)}
          />
        </React.Fragment>
      );
    });

    return (
      <div className="task-list">
        <ul className="todo-list">{elements}</ul>
      </div>
    );
  }
}
