import { Component } from "react";
import TaskFilter from "../task-filter";
import './footer.css';

export default class Footer extends Component {

  render() {
    const { clearCompleted, activeTasks, taskFilterAll, taskFilterActive, taskFilterCompleted, filterStatus } = this.props;

    return (
      <footer className="footer">
          <span className="todo-count">{activeTasks} items left</span>
          <ul className="filters">
            <TaskFilter taskFilterAll = { taskFilterAll }
                        taskFilterActive = { taskFilterActive }
                        taskFilterCompleted = { taskFilterCompleted }
                        filterStatus = { filterStatus }
                        />
          </ul>
          <button className="clear-completed"
                  onClick = { clearCompleted }>Clear completed</button>
        </footer>
    )
  }
}