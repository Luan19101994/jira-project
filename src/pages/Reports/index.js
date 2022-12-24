import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import '../../assets/css/Report.css'
function App() {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setTask(newValue);
  }

  function addTask() {
    setItems(prevValues => {
      return [...prevValues, task];
    });
    setTask("");
  }

  function deleteItem(id) {
    setItems(prevValues => {
      return prevValues.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="report">
      <div className="container">
        <div className="heading">
          <h1>Note Report</h1>
        </div>
        <div className="form flex justify-between">
          <input
            name="taskInput"
            type="text"
            onChange={handleChange}
            value={task}
          />
          <button onClick={addTask}>
            <span>ADD</span>
          </button>
        </div>
        <div>
          <ul>
            {items.map((item, index) => (
              <ToDoItem
                key={index}
                id={index}
                text={item}
                onChecked={deleteItem}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
