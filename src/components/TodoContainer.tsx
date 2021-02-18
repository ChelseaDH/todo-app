import * as React from 'react';
import styles from '../App.module.css';
import TodoActionBox from "./TodoActionBox";
import TodoForm from "./TodoForm";
import TodoElement from "./TodoElement";
import {Filter} from "./Filters";

export interface Todo {
    text: string,
    isCompleted: boolean,
}

const TodoContainer = () => {
    const [todos, setTodos] = React.useState(
        JSON.parse(localStorage.getItem('todos') as string) ?? []
    );

    React.useEffect((): void => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const [filter, setFilter] = React.useState(Filter.ALL);

    const addTodo = (text: string): void => {
        const newTodos = [...todos, {text: text, isCompleted: false}];
        setTodos(newTodos);
    };

    const toggleComplete = (index: number, completed: boolean): void => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = completed;
        setTodos(newTodos);
    };

    const toggleCompleteOnAll = (completed: boolean): void => {
        setTodos(todos.map((todo: Todo) => {
            const newTodo = todo;
            newTodo.isCompleted = completed;
            return newTodo;
        }));
    };

    const removeTodo = (index: number): void => {
        const newTodos = [...todos];
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

    const remainingTodos = todos.reduce((count: number, todo: Todo) => (!todo.isCompleted ? count + 1 : count), 0);

    return (
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
    )
}

export default TodoContainer;