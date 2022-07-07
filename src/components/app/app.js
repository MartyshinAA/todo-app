import { Component } from "react";
import PropTypes from "prop-types";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import { formatDistanceToNow } from 'date-fns'

import './app.css'

export default class App extends Component {
  
  id = 0;

  static defaultProps = {
    timeout: 10000,
  }

  static propTypes = {
    timeout: PropTypes.number,
  }


  state = {
    todoData : [
      this.createTodoElement('Completed task'),
      this.createTodoElement('Editing task'),
      this.createTodoElement('Active task'),
    ],
    filter: 'all',
  }
  
  createTodoElement (description) {
    // let { id } = this.props;
    return {
      description,
      completed: false,
      editing: false,
      creationTime: Date.now(),
      created: `have now been created`,
      id: this.id++,
    }
  }

  componentDidMount() {
    const { timeout } = this.props;
    this.timerID = setInterval(
      () => this.renewCreationDate(),
      timeout
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  renewCreationDate() {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((task) => {
          task.created = `created ${formatDistanceToNow(task.creationTime, {includeSeconds: true})} ago` 
        return task;
      })
      return {
        todoData: newArray
      }
    });
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((task) => !task.completed )
      return {
        todoData: newArray
      }
    });
  }

  editTodoElement = (e, id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((task) => {
        if (task.id === id) {
          task.description = e.target.value 
        }
                return task;
      })
      return {
        todoData: newArray
      }
    });
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
      return {
        todoData: this.toggleProperties(todoData, id, 'completed')
      }
    });
  }

  onDescriptionEditing = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperties(todoData, id, 'editing')
      }
    });
  }

  toggleProperties (arr, id, propName) {
    const newArray = arr.map((task) => {
      if (task.id === id) {
        task[propName] = !task[propName];
      }
      return task;
    })
    return newArray;
  }

  addNewTask = text => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData, this.createTodoElement (text)]
      return {
        todoData: newArray
      };
    })
  }

  taskFilterButton = e => {
    this.setState(({ filter }) => {
      return {
        filter: e.target.textContent.toLowerCase()
      }
    })
  }

  taskFilter (tasks, filter) {
    switch(filter) {
      case 'all': return tasks;
      case 'active': return tasks.filter((task) => !task.completed);
      case 'completed': return tasks.filter((task) => task.completed);
      default: return tasks;
    }
  }

  render () {
    const { todoData, filter } = this.state;
    const activeTasks = todoData.filter((task) => !task.completed).length;
    const filteredTasks = this.taskFilter(todoData, filter);

    return (
      <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addNewTask = { this.addNewTask }/>
        </header>
        <section className="main">
          <div className="todo-app">
            <TaskList todos = { filteredTasks }
                      deleteTodoElement = { this.deleteTodoElement}
                      editTodoElement = { this.editTodoElement } 
                      onDescriptionCompleted = { this.onDescriptionCompleted } 
                      onDescriptionEditing = { this.onDescriptionEditing }
                      />
          </div>
          <Footer clearCompleted = { this.clearCompleted }
                  activeTasks = { activeTasks }
                  taskFilterButton = { this.taskFilterButton }
                  filterStatus = { filter }
                  buttonUp = { this.buttonUp }
                  />
        </section>
      </section>
    </>
    );
  }
};