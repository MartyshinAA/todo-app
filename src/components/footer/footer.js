import { Component } from "react";
import PropTypes from "prop-types";
import TaskFilter from "../task-filter";
import './footer.css';

export default class Footer extends Component {

  static defaultProps = {
    activeTasks: 3,
    filterStatus: 'all',
  }

  static propTypes = {
    clearCompleted: PropTypes.func.isRequired,
    activeTasks: PropTypes.number,
    filterStatus: PropTypes.string,
  }

  taskFilterButton = e => {   // Костыль, конечно
    this.props.taskFilterButton(e)
  }

  render() {
    const { clearCompleted, activeTasks, filterStatus } = this.props;

    return (
      <footer className="footer">
          <span className="todo-count">{activeTasks} items left</span>
            <TaskFilter 
                        taskFilterButton = { this.taskFilterButton }
                        filterStatus = { filterStatus }
                        // почему-то не срабатывает onClick, хотел сделать как в поиске по GitHUB делегирование событий
                        />
          <button className="clear-completed"
                  onClick = { clearCompleted }>Clear completed</button>
        </footer>
    )
  }
}