import { useEffect, useState } from "react";
import {
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
} from "../services/requests.services";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getReceivedRequests();
      setRequests(response.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      console.log(requestId);
      await acceptRequest(requestId);

      alert("Request accepted successfully");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);

      alert("Request rejected successfully");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to reject request");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Received Requests</h1>

      {requests.length === 0 ? (
        <p>No requests received yet.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="text-xl font-semibold">{request.task?.title}</h2>

            <p className="mt-2">{request.task?.description}</p>

            <p className="text-gray-600 mt-2">📍 {request.task?.location}</p>

            <div className="mt-4 border-t pt-3">
              <p>
                <strong>Helper:</strong> {request.requester?.firstName}{" "}
                {request.requester?.lastName}
              </p>

              <p>
                <strong>Email:</strong> {request.requester?.email}
              </p>

              <p>
                <strong>Phone:</strong> {request.requester?.phone}
              </p>
            </div>

            <p className="mt-3">
              Status:
              <span className="font-semibold ml-2">{request.status}</span>
            </p>

            {request.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Requests;
