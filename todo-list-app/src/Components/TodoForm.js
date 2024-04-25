import React from "react"

export const TodoForm = () => {
    return (
        <form className="todo-form">
            <input type="text" className="todo-input" placeholder="Enter a task"/>
            <button type="submit" className="todo-button">Add Task</button>
        </form>
    );
}