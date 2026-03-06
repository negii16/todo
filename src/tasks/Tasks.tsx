import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completionStatus: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskName, setTaskName] = useState("");

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const completedTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completionStatus: !task.completionStatus }
        : task,
    );
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddTask();
            }
          }}
          id="task-input"
        />
        <button onClick={onAddTask}>Add</button>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{ color: task.completionStatus ? "grey" : "black" }}
            >
              {" "}
              {task.title}{" "}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => completedTask(task.id)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
