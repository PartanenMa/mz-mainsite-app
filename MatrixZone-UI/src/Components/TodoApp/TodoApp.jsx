import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [todoNumber, setTodoNumber] = useState(0);

    function addTodo() {
        if (inputValue && todoNumber < 5) {
            setTodoNumber(todoNumber + 1);
            setTodos([...todos, inputValue]);
            setInputValue("");
        } else if (todoNumber >= 5) {
            document.getElementById("InputTodo").value = "";
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    function removeTodo(index) {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        setTodoNumber(todoNumber - 1);
    }

    return (
        <div className="TodoAppContainer">
            <h3>TodoApp</h3>
            <input id="InputTodo" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <button onClick={addTodo}>Add todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <div className="Todo" onClick={() => removeTodo(index)} key={index}>
                        <p className="p1">Todo {index + 1} (CLICK TO REMOVE):</p>
                        <p className="p2">{todo}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
