import React, { useState } from "react";


interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Learn Typescript with Cyn", completed: false },
    { id: 2, text: "Build Todo List App", completed: false },
  ]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const handleRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput(""); // Clearing the input after adding a new todo
  };

  return (
    <div className="main-container">
      <h1>ToDo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            className="list-item" 
          >
             <span className="text">{todo.text}</span> 
            <button 
              onClick={() => handleRemove(todo.id)} 
              className="x-button" 
            >
              X
            </button> 
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New To-do"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add</button>
      <div className="quote-text">Stay motivated and conquer your goals!</div>
    </div>
  );
};
