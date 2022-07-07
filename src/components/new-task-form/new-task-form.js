import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addNewTask(this.state.description);
    this.setState({
      description: '',
    });
  };

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={this.state.description}
        ></input>
      </form>
    );
  }
}
