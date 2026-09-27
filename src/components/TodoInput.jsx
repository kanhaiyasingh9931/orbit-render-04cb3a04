import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoInput.css';

/**
 * TodoInput – a controlled input component for creating new todo items.
 *
 * Props
 * -----
 * onAddTodo: (title: string) => void
 *   Callback invoked with the trimmed todo title when the user submits the form.
 *
 * The component handles its own internal state, prevents empty submissions,
 * clears the input after a successful add, and is fully accessible.
 */
export default function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAddTodo(trimmed);
    setTitle('');
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit} aria-label="Add new todo">
      <label htmlFor="new-todo" className="visually-hidden">
        New todo
      </label>
      <input
        id="new-todo"
        type="text"
        className="todo-input__field"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
        autoComplete="off"
        aria-required="true"
      />
      <button
        type="submit"
        className="todo-input__button"
        disabled={title.trim() === ''}
        aria-disabled={title.trim() === ''}
      >
        Add
      </button>
    </form>
  );
}

TodoInput.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};