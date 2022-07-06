import { Component } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import { formatDistanceToNow } from 'date-fns'

import './app.css'

export default class App extends Component {
  
  id = 0;

  state = {
    todoData : [
      this.createTodoElement('Completed task'),
      this.createTodoElement('Editing task'),
      this.createTodoElement('Active task'),
    ],
    filter: 'active',
  }
  
  createTodoElement (description) {
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
    this.timerID = setInterval(
      () => this.renewCreationDate(),
      10000
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

  // editTodoElement = (description, id) => {
  //   this.setState(({ todoData }) => {
  //     const newArray = todoData.map((task) => {
  //       if (task.id === id) {
  //         task.description = description 
  //       }
  //               return task;
  //     })
  //     return {
  //       todoData: newArray
  //     }
  //   });
  // }

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

  onDescriptionEditing = id => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((task) => {
        if (task.id === id) {
          task.editing = !task.editing;
        }
        return task;
      })
      return {
        todoData: newArray
      }
    });
  }

  addNewTask = text => {
    // console.log(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, this.createTodoElement (text)]
      return {
        todoData: newArray
      };
    })
  }

  taskFilterAll = () => {
    this.setState(({ filter }) => {
      // console.log('All')
      return {
        filter: 'all'
      }
    })
  }

  taskFilterActive = () => {
    this.setState(({ filter }) => {
      // console.log('Active')
      return {
        filter: 'active'
      }
    })
  }

  taskFilterCompleted = () => {
    this.setState(({ filter }) => {
      // console.log('Completed')
      return {
        filter: 'completed'
      }
    })
  }

  taskFilter (tasks, filter) {
    // console.log(tasks, filter);
    switch(filter) {
      case 'all': return tasks;
      case 'active': return tasks.filter((task) => !task.completed);
      case 'completed': return tasks.filter((task) => task.completed);
      default: return tasks;
    }
  }
  
  render () {
    const { todoData, filter } = this.state;
    const activeTasks = this.state.todoData.filter((task) => !task.completed).length;
    const filteredTasks = this.taskFilter(todoData, filter);

    return (<>
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm addNewTask = { this.addNewTask }/>
      </header>
      <div className="todo-app">
        <TaskList todos = { filteredTasks }
                  deleteTask = { this.deleteTodoElement} 
                  onDescriptionCompleted = { this.onDescriptionCompleted } 
                  onDescriptionEditing = { this.onDescriptionEditing } 
                  />
      </div>
      <Footer clearCompleted = { this.clearCompleted }
              activeTasks = { activeTasks }
              taskFilterAll = { this.taskFilterAll }
              taskFilterActive = { this.taskFilterActive }
              taskFilterCompleted = { this.taskFilterCompleted }
              filterStatus = { filter }
              />
      </>
    );
  }
};