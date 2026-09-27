import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * TodoList component
 *
 * Renders a collection of TodoItem components. If the list is empty,
 * an accessible empty‑state message is shown.
 *
 * @param {Object} props
 * @param {Array}  props.todos      Array of todo objects.
 * @param {Function} props.onToggle Callback invoked with a todo id when its completed state toggles.
 * @param {Function} props.onDelete Callback invoked with a todo id when the todo should be removed.
 */
const TodoList = ({ todos, onToggle, onDelete }) => {
  if (!todos || todos.length === 0) {
    return (
      <p className="todo-list__empty" role="status" aria-live="polite">
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  /** Array of todo objects */
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
    })
  ).isRequired,

  /** Called with the id of the todo to toggle its completed state */
  onToggle: PropTypes.func.isRequired,

  /** Called with the id of the todo to delete it */
  onDelete: PropTypes.func.isRequired,
};

export default memo(TodoList);
