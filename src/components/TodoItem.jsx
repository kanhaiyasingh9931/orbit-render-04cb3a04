import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

/**
 * TodoItem component – renders a single todo with toggle and delete actions.
 *
 * @param {Object} props
 * @param {{ id: string|number, title: string, completed: boolean, createdAt: string }} props.todo
 * @param {(id: string|number) => void} props.onToggle
 * @param {(id: string|number) => void} props.onDelete
 */
const TodoItem = ({ todo, onToggle, onDelete }) => {
  const { id, title, completed } = todo;

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [onToggle, id]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  const handleKeyPress = useCallback(
    (e) => {
      // Space or Enter toggles the completed state
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <li
      className={`todo-item ${completed ? 'completed' : ''}`}
      role="listitem"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      aria-label={`Todo: ${title}. ${completed ? 'Completed' : 'Not completed'}. Press Enter or Space to toggle.`}
    >
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          aria-checked={completed}
          className="todo-item__checkbox"
        />
        <span className="todo-item__text">{title}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={handleDelete}
        aria-label={`Delete todo: ${title}`}
      >
        &times;
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(TodoItem);