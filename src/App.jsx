import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

/**
 * Main application component.
 *
 * Responsibilities
 * ---------------
 * - Load persisted todos from localStorage on mount.
 * - Persist todos to localStorage whenever they change.
 * - Provide CRUD operations (add, toggle, delete).
 * - Manage UI filter state (All / Active / Completed).
 * - Render TodoInput, filter controls, and TodoList.
 */
export default function App() {
  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem('todos');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse todos from localStorage', e);
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // -------------------------------------------------------------------------
  // Effects
  // -------------------------------------------------------------------------
  // Persist todos whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);

  // -------------------------------------------------------------------------
  // Handlers (memoized for performance)
  // -------------------------------------------------------------------------
  const handleAddTodo = useCallback((title) => {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // -------------------------------------------------------------------------
  // Derived data
  // -------------------------------------------------------------------------
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Todo App</h1>
      </header>

      <main className="app__main">
        <TodoInput onAddTodo={handleAddTodo} />

        <section className="app__filters" aria-label="Todo filters">
          <button
            type="button"
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            aria-pressed={filter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            aria-pressed={filter === 'active'}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            aria-pressed={filter === 'completed'}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </section>

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>

      <footer className="app__footer">
        <p>
          {todos.length} {todos.length === 1 ? 'item' : 'items'} total
        </p>
      </footer>
    </div>
  );
}