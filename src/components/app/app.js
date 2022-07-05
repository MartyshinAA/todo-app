import { Component } from "react";
import TaskList from "../task-list";
// import Task from "../task";

import './app.css'

export default class App extends Component {
  
  id = 0
  
  state = {
    todoData : [
      this.createTodoElement('Completed task'),
      this.createTodoElement('Editing task'),
      this.createTodoElement('Active task'),
    ]
  }
  
  createTodoElement (description) {
    return {
      description,
      completed: false,
      editing: false,
      created: 'created 5 minutes ago',
      id: this.id++,
    }
  }

  deleteTodoElement = id => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((task) => task.id !== id )
      return {
        todoData: newArray
      }
    });
  }

  onDescriptionCompleted = id => {
    this.setState(({ todoData }) => {
      // console.log(todoData)
      const newArray = todoData.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
      return {
        todoData: newArray
      }
    });
  }
  
  render () {
    return (
      <div className="todo-app">
        <TaskList todos = { this.state.todoData }
                  deleteTask = { (id) => this.deleteTodoElement(id)} 
                  onDescriptionCompleted = { (id) => this.onDescriptionCompleted(id) } />
        {/* <Task todos={ this.state.todoData } /> */}
      </div>
    );
  }
};