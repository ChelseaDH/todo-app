import * as React from 'react';
import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

interface Todo {
    text: string,
    isCompleted: boolean,
}

type todoElementProps = {
    todo: Todo,
    index: number,
    completeTodo: (index: number, completed: boolean) => void,
    removeTodo: (index: number) => void,
}

const TodoElement = (props: todoElementProps): JSX.Element => {
  const completed = props.todo.isCompleted;
  return (
      <div
          className={styles.todo}
      >
          <input
              type="checkbox"
              onClick={() => props.completeTodo(props.index, !completed)}
              checked={completed}
          />
          <div
              className={styles.todoText}
              style={{ textDecoration: completed ? "line-through" : ""}}
          >{props.todo.text}</div>
          <div
              className={styles.removeButton}
              onClick={() => props.removeTodo(props.index)}
          ><FontAwesomeIcon icon={faTimes}/></div>
      </div>
  );
}

type todoFormProps = {
    addTodo: (text: string) => void,
}

const TodoForm = (props: todoFormProps) => {
    const [todoText, setTodoText] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!todoText) return;
        props.addTodo(todoText);
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

type TodoActionsProps = {
    toggleCompleteOnAll: (completed: boolean) => void
    removeAllCompleted: () => void
}

const TodoActions = (props: TodoActionsProps) => {
    return (
        <div className={styles.todoActions}>
            <h1>Actions</h1>
            <button
                className={styles.actionButton}
                onClick={() => props.toggleCompleteOnAll(true)}
            >
                Mark all complete
            </button>
            <button
                className={styles.actionButton}
                onClick={() => props.toggleCompleteOnAll(false)}
            >
                Mark all active
            </button>
            <button
                className={styles.actionButton}
                onClick={props.removeAllCompleted}
            >
                Remove all completed
            </button>
        </div>
    )
}

type RemainingTodosProps = {
    remainingTodos: number
}

const RemainingTodos = (props: RemainingTodosProps) => {
    return (
        <div>
            <h1>Remaining</h1>
            <p>
                {props.remainingTodos} item{props.remainingTodos === 1 ? '' : 's'}
            </p>
        </div>
    )
}

enum Filter {
    ALL = 'all',
    INCOMPLETE = 'incomplete',
    COMPLETED = 'completed'
}

type FiltersProps = {
    applyFilter: Function,
}

const Filters = (props: FiltersProps) => {
    return (
        <div className={styles.filters}>
            <h1>Filter</h1>
            <button
                className={styles.actionButton}
                onClick={() => props.applyFilter(Filter.ALL)}
            >
                All
            </button>
            <button
                className={styles.actionButton}
                onClick={() => props.applyFilter(Filter.INCOMPLETE)}
            >
                Active
            </button>
            <button
                className={styles.actionButton}
                onClick={() => props.applyFilter(Filter.COMPLETED)}
            >
                Completed
            </button>
        </div>
    )
};

type TodoActionBoxProps = {
    toggleCompleteOnAll: (completed: boolean) => void
    removeAllCompleted: () => void
    remainingTodos: number
    applyFilter: Function
}

const TodoActionBox = (props: TodoActionBoxProps) => {
    return (
        <div className={styles.todoActionBox}>
            <TodoActions
                toggleCompleteOnAll={props.toggleCompleteOnAll}
                removeAllCompleted={props.removeAllCompleted}
            />
            <Filters
                applyFilter={props.applyFilter}
            />
            <RemainingTodos remainingTodos={props.remainingTodos} />
        </div>
    )
}

const App = () => {
  const [todos, setTodos] = React.useState(
      JSON.parse(localStorage.getItem('todos') as string) ?? []
  );

  const [remainingTodos, setRemainingTodos] = React.useState(() => {
      let count = 0;
      todos.forEach((todo: Todo) => {
          if (!todo.isCompleted) {
              count++;
          }
      })
      return count;
  });

  const [filter, setFilter] = React.useState(Filter.ALL);

  const addTodo = (text: string): void => {
      const newTodos = [...todos, {text: text, isCompleted: false}];
      setTodos(newTodos);

      setRemainingTodos(remainingTodos + 1);
  };

  const toggleComplete = (index: number, completed: boolean): void => {
      const newTodos = [...todos];
      newTodos[index].isCompleted = completed;
      setTodos(newTodos);

      setRemainingTodos(
          completed ? remainingTodos - 1 : remainingTodos + 1
      )
  };

  const toggleCompleteOnAll = (completed: boolean): void => {
      setTodos(todos.map((todo: Todo) => {
          const newTodo = todo;
          newTodo.isCompleted = completed;
          return newTodo;
      }));

      setRemainingTodos(completed ? 0 : todos.length);
  };

  const removeTodo = (index: number): void => {
      const newTodos = [...todos];

      if (!newTodos[index].isCompleted) {
          setRemainingTodos(remainingTodos - 1);
      }

      newTodos.splice(index, 1);
      setTodos(newTodos);
  }

  const removeAllCompleted = (): void => {
      const newTodos = [...todos].filter((todo) => {
          return !todo.isCompleted;
      })
      setTodos(newTodos);
  }

  const filterTodos = (filter: Filter): Todo[] => {
      switch (filter) {
          case Filter.INCOMPLETE:
              return todos.filter((todo: Todo) => !todo.isCompleted);
          case Filter.COMPLETED:
              return todos.filter((todo: Todo) => todo.isCompleted);
          default:
              return todos;
      }
  }
  let filteredList: Todo[] = filterTodos(filter);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
          <h1>Todo List</h1>
      </div>
      <div className={styles.todosContainer}>
          <TodoForm addTodo={addTodo} />
          <div className={styles.todoList}>
            {filteredList.map((todo: Todo, index: number): JSX.Element => (
                <TodoElement
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={toggleComplete}
                  removeTodo={removeTodo}
                />
              ))}
          </div>
          <TodoActionBox
              toggleCompleteOnAll={toggleCompleteOnAll}
              removeAllCompleted={removeAllCompleted}
              applyFilter={setFilter}
              remainingTodos={remainingTodos}
          />
      </div>
    </div>
  );
}

export default App;
