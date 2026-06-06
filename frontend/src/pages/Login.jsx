import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.services";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(formData);
      console.log(response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6"> Login </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
        </div>
        <div>
          {" "}
          <label className="block mb-1 font-medium"> Password </label>{" "}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />{" "}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue=600 text-white p-3 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <p className="mt-4 text-center">
        {" "}
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          {" "}
          Register{" "}
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
