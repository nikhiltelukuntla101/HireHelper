import { useEffect, useState } from "react";
import { getMyRequests } from "../services/requests.services";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();
      setRequests(response.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="text-xl font-semibold">{request.task?.title}</h2>

            <p className="mt-2">{request.task?.description}</p>

            <p className="text-gray-600 mt-2">📍 {request.task?.location}</p>

            <p className="mt-2">
              Status:
              <span
                className={`font-semibold ml-2 ${getStatusColor(
                  request.status,
                )}`}
              >
                {request.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;
