import { Component } from 'react';
import './task-filter.css';

export default class TaskFilter extends Component {

  render() {
    const { taskFilterAll, taskFilterActive, taskFilterCompleted, filterStatus } = this.props;
    // console.log(filterStatus);
    // const clas = filterStatus
    return (
      <>
      <li>
      <button className={ filterStatus === 'all' ? "selected" : ''}
              onClick = { taskFilterAll }>All</button>
    </li>
    <li>
      <button className={ filterStatus === 'active' ? "selected" : ''}
              onClick = { taskFilterActive }>Active</button>
    </li>
    <li>
      <button className={ filterStatus === 'completed' ? "selected" : ''}
              onClick = { taskFilterCompleted }>Completed</button>
    </li>
      </>
    )}
}