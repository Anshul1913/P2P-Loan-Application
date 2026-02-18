import React, { useState, useEffect } from "react";
import KycVerificationApi from "../../services/KycVerificationService";
import { useNavigate } from "react-router-dom";
import KycDetailsModal from "./ViewKycDetails";
import { set } from "lodash";

const KycRequestPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0); // backend usually starts at 0
  const [size] = useState(10); // rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  useEffect(() => {
    fetchKycRequests();
  }, [page]);

  const fetchKycRequests = async () => {
    try {
      const response = await KycVerificationApi.getAllKycRequests(page, size);

      setRequests(response.content || []);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
    }
  };

  const handleViewDocumentClick = (id) => {
    setSelectedRequestId(id);
    setIsOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">KYC Requests</h2>

      {/* Table */}
      <table className="w-full bg-white shadow-sm rounded text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th>Type</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="p-3 font-medium">{req.userName}</td>
              <td>{req.roleType}</td>
              <td>{new Date(req.submitDate).toDateString()}</td>
              <td>
                {req.kycStatus === "APPROVED" && (
                  <span className="text-green-600 font-medium">Approved</span>
                )}
                {req.kycStatus === "PENDING" && (
                  <span className="text-orange-600 font-medium">Pending</span>
                )}
                {req.kycStatus === "REJECTED" && (
                  <span className="text-red-600 font-medium">Rejected</span>
                )}
              </td>
              <td className="flex gap-2 py-2 items-center">
                <button
                  onClick={() => {handleViewDocumentClick(req.id)}}
                  className="text-blue-600 text-xl"
                >
                  👁 View
                </button>

                <KycDetailsModal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  requestId={selectedRequestId}
                  onActionComplete={(status) => {console.log(status);
                  }}
                />
                {/* <button
                  onClick={() => handleViewDocumentClick(req.id)}
                  className="text-blue-600 text-xl"
                >
                  👁 View
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded ${
            page === 0
              ? "bg-gray-300 rounded-2xl cursor-not-allowed"
              : "rounded-2xl my-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 hover:bg-indigo-600"
          }`}
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 rounded ${
                i === page
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            page === totalPages - 1
              ? "bg-gray-300 rounded-2xl cursor-not-allowed"
              : "rounded-2xl my-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KycRequestPage;
