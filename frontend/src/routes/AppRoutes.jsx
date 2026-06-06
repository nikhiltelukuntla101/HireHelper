import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";

// Dashboard Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import Feed from "../pages/Feed";
import MyTasks from "../pages/MyTasks";
import Requests from "../pages/Requests";
import MyRequests from "../pages/MyRequests";
import AddTask from "../pages/AddTask";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Feed />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="requests" element={<Requests />} />
        <Route path="my-requests" element={<MyRequests />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
