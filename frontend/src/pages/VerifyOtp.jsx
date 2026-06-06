import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/auth.services";
function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({
        email,
        otp,
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOtp;
