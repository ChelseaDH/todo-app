import * as React from 'react';
import styles from '../App.module.css';
import TodoContainer from "./TodoContainer";

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
          <h1>Todo List</h1>
      </div>
      <TodoContainer />
    </div>
  );
}

export default App;
