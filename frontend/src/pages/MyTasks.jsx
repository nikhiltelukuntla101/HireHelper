import { useEffect, useState } from "react";
import { getMyTasks } from "../services/task.services";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getMyTasks();
      setTasks(response.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id} className="border rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-semibold">{task.title}</h2>

          <p>{task.description}</p>

          <p>📍 {task.location}</p>

          <p>
            Status:
            <span className="font-semibold ml-2">{task.status}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyTasks;
