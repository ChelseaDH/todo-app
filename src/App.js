import React from 'react';
import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  const completed = todo.isCompleted;
  return (
      <div
          className={styles.todo}
      >
          <input
              type="checkbox"
              onClick={() => completeTodo(index, !completed)}
              checked={completed}
          />
          <div
              className={styles.todoText}
              style={{ textDecoration: completed ? "line-through" : ""}}
          >{todo.text}</div>
          <div
              className={styles.removeButton}
              onClick={() => removeTodo(index)}
          ><FontAwesomeIcon icon={faTimes}/></div>
      </div>
  );
}

const TodoForm = ({ addTodo }) => {
    const [todoText, setTodoText] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!todoText) return;
        addTodo(todoText);
        setTodoText("");
    };

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.newTodoInput}
                placeholder="What needs to be done?"
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
            />
            <input
                type="submit"
                className={styles.addTodoBtn}
                value="Add"
            />
        </form>
    );
}

const TodoActions = ({markAllAsComplete, removeAllCompleted}) => {
    return (
        <div className={styles.todoActions}>
            <h1>Actions</h1>
            <button
                className={styles.actionButton}
                onClick={markAllAsComplete}
            >
                Mark all complete
            </button>
            <button
                className={styles.actionButton}
                onClick={removeAllCompleted}
            >
                Remove all completed
            </button>
        </div>
    )
}

const RemainingTodos = ({remainingTodos}) => {
    return (
        <div>
            <h1>Remaining</h1>
            <p>
                {remainingTodos} item{remainingTodos === 1 ? '' : 's'}
            </p>
        </div>
    )
}

const filters = {
    ALL: 'all',
    INCOMPLETE: 'incomplete',
    COMPLETED: 'completed'
}

const Filters = ({applyFilter}) => {
    return (
        <div className={styles.filters}>
            <h1>Filter</h1>
            <button
                className={styles.actionButton}
                onClick={() => applyFilter(filters.ALL)}
            >
                All
            </button>
            <button
                className={styles.actionButton}
                onClick={() => applyFilter(filters.INCOMPLETE)}
            >
                Active
            </button>
            <button
                className={styles.actionButton}
                onClick={() => applyFilter(filters.COMPLETED)}
            >
                Completed
            </button>
        </div>
    )
};

const TodoActionBox = ({markAllAsComplete, remainingTodos, removeAllCompleted, applyFilter}) => {
    return (
        <div className={styles.todoActionBox}>
            <TodoActions
                markAllAsComplete={markAllAsComplete}
                removeAllCompleted={removeAllCompleted}
            />
            <Filters
                applyFilter={applyFilter}
            />
            <RemainingTodos remainingTodos={remainingTodos} />
        </div>
    )
}

const App = () => {
  const [todos, setTodos] = React.useState(
      JSON.parse(localStorage.getItem('todos')) || []
  );

  const [remainingTodos, setRemainingTodos] = React.useState(() => {
      let count = 0;
      todos.forEach(todo => {
          if (!todo.isCompleted) {
              count++;
          }
      })
      return count;
  });

  const [filter, setFilter] = React.useState(filters.ALL);

  React.useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
      const newTodos = [...todos, {text: text, isCompleted: false}];
      setTodos(newTodos);

      setRemainingTodos(remainingTodos + 1);
  };

  const toggleComplete = (index, completed) => {
      const newTodos = [...todos];
      newTodos[index].isCompleted = completed;
      setTodos(newTodos);

      setRemainingTodos(
          completed ? remainingTodos - 1 : remainingTodos + 1
      )
  };

  const markAllAsComplete = () => {
      const newTodos = [...todos];
      newTodos.forEach(todo => {
          todo.isCompleted = true;
      })
      setTodos(newTodos);

      setRemainingTodos(0);
  };

  const removeTodo = index => {
      const newTodos = [...todos];

      if (!newTodos[index].isCompleted) {
          setRemainingTodos(remainingTodos - 1);
      }

      newTodos.splice(index, 1);
      setTodos(newTodos);
  }

  const removeAllCompleted = () => {
      const newTodos = [...todos].filter((todo) => {
          return !todo.isCompleted;
      })
      setTodos(newTodos);
  }

  let filteredList = [];
  switch (filter) {
      case filters.INCOMPLETE:
          filteredList = todos.filter(todo => !todo.isCompleted);
          break;
      case filters.COMPLETED:
          filteredList = todos.filter(todo => todo.isCompleted);
          break;
      default:
          filteredList = todos;
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
          <h1>Todo List</h1>
      </div>
      <div className={styles.todosContainer}>
          <TodoForm addTodo={addTodo} />
          <div className={styles.todoList}>
            {filteredList.map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={toggleComplete}
                  removeTodo={removeTodo}
                />
              ))}
          </div>
          <TodoActionBox
              markAllAsComplete={markAllAsComplete}
              removeAllCompleted={removeAllCompleted}
              applyFilter={setFilter}
              remainingTodos={remainingTodos}
          />
      </div>
    </div>
  );
}

export default App;
