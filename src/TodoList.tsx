import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Stay Focused & Disciplined", completed: false },
    { id: 2, text: "Cynthia Loves You", completed: false },
  ]);
  const [input, setInput] = useState<string>("");
  const [taskChanged, setTaskChanged] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
    setTaskChanged("Task Completed, great job!");
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setTaskChanged("Task removed");
  };

  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setTaskChanged("Task added, don't forget!");
    setInput(""); // Clearing the input after adding a new todo
  };

  useEffect(() => {
    if (taskChanged) {
      const timer = setTimeout(() => {
        setTaskChanged("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [taskChanged]);

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
      {taskChanged && <div>{taskChanged}</div>}
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

