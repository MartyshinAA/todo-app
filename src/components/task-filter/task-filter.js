import { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default class TaskFilter extends Component {

  static defaultProps = {
    filterStatus: 'all',
  }

  static propTypes = {
    taskFilterButton: PropTypes.func.isRequired, 
    filterStatus: PropTypes.string,
  }

  filterButtons = [
    {name:'all', value: 'All' },
    {name:'active', value: 'Active' },
    {name:'completed', value: 'Completed' },
  ]

  render() {
    const { taskFilterButton, filterStatus } = this.props;
    const buttons = this.filterButtons.map(({ name, value }) => {
      return (
        <li key = { name }>
          <button className={ filterStatus === name ? "selected" : ''}
                  onClick = { e => taskFilterButton(e) }
                  >{ value }</button>
        </li>
      )
    })

    return (
      <ul className="filters">
        { buttons }
      </ul>
    )}
}