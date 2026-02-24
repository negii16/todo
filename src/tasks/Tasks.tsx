import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completionStatus: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "somethign", completionStatus: false },
  ]);

  const [taskName, setTaskName] = useState("");

  const onAddTask = () => {
    if (taskName.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskName, completionStatus: false },
    ]);
    setTaskName("");
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="cont">
        <h2>Tasks to Do</h2>
        <label htmlFor="task-input">add task</label>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          id="task-input"
        />
        <button onClick={onAddTask}>Add</button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {" "}
              {task.title}{" "}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
