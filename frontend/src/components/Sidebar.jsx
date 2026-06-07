import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h1>HireHelper</h1>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard">Feed</Link>
        <Link to="/dashboard/my-tasks">My Tasks</Link>
        <Link to="/dashboard/requests">Requests</Link>
        <Link to="/dashboard/my-requests">My Requests</Link>
        <Link to="/dashboard/add-task">Add Task</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </div>
      <div className="mt-20">
        <p>
          {user?.firstName} {user?.lastName}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
