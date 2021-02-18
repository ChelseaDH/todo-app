import styles from "../App.module.css";
import * as React from "react";

export enum Filter {
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

export default Filters;