import React, { useEffect, useState } from "react";

import "./App.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Update local storage whenever tasks change

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  // handlePriorityChange
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }

    const newTask = {
      text: textInput,
      priority: selectedPriority,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8">
      <div className="lg:flex grid gap-2 items-center font-main">
        <div className="">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full lg:w-96 border rounded p-2"
            placeholder="Enter task"
          />
        </div>
        <div className="">
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="w-full border rounded p-2"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Add Task
        </button>
      </div>

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-100 p-4 rounded border border-red-400">
            <h2 className="text-lg font-primary font-semibold mb-2">
              High Priority
            </h2>
            {getTasksByPriority("High").map((task, index) => (
              <div key={index} className="bg-white p-2 rounded mb-2">
                <p
                  className="text-base cursor-pointer font-secondary"
                  onClick={() => setSelectedTask(task)}
                >
                  - {task.text}
                </p>
                {selectedTask === task && (
                  <div className="mt-2 space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleEditTask(prompt("Edit task:", selectedTask.text))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleChangePriority(
                          prompt("Enter new priority:", selectedTask.priority)
                        )
                      }
                    >
                      Change Priority
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-yellow-100 p-4 rounded border border-yellow-400 font-primary">
            <h2 className="text-lg font-semibold mb-2">Medium Priority</h2>
            {getTasksByPriority("Medium").map((task, index) => (
              <div key={index} className="bg-yellow-100 p-2 rounded mb-2">
                <p
                  className="text-base cursor-pointer font-secondary"
                  onClick={() => setSelectedTask(task)}
                >
                  - {task.text}
                </p>

                {selectedTask === task && (
                  <div className="mt-2 space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleEditTask(prompt("Edit task:", selectedTask.text))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleChangePriority(
                          prompt("Enter new priority:", selectedTask.priority)
                        )
                      }
                    >
                      Change Priority
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-green-100 p-4 rounded border border-green-400 font-primary">
            <h2 className="text-lg font-semibold mb-2">Low Priority</h2>
            {getTasksByPriority("Low").map((task, index) => (
              <div key={index} className="bg-green-100 p-2 rounded mb-2">
                <p
                  className="text-base cursor-pointer font-secondary"
                  onClick={() => setSelectedTask(task)}
                >
                  - {task.text}
                </p>

                {selectedTask === task && (
                  <div className="mt-2 space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleEditTask(prompt("Edit task:", selectedTask.text))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleChangePriority(
                          prompt("Enter new priority:", selectedTask.priority)
                        )
                      }
                    >
                      Change Priority
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
