import * as React from "react";

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

export default RemainingTodos;