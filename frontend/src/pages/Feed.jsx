import { useEffect, useState } from "react";
import { getFeedTasks, requestTask } from "../services/task.services";

function Feed() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getFeedTasks();

      setTasks(response.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRequest = async (taskId) => {
    try {
      await requestTask(taskId);
      alert("Request sent successfully");
    } catch (error) {
      alert("Fail");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Available Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id} className="border rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-semibold">{task.title}</h2>

          <p className="mt-2">{task.description}</p>

          <p className="text-gray-600 mt-2">📍 {task.location}</p>

          <button
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleRequest(task._id)}
          >
            Request Task
          </button>
        </div>
      ))}
    </div>
  );
}

export default Feed;
