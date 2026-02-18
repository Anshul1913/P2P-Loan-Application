import React, { useState, useEffect } from "react";
import KycVerificationApi from "../../services/KycVerificationService";

import Base64StringToImage from '../../utils/Base64StringToImage';

const KycDetailsModal = ({ isOpen, onClose, requestId, onActionComplete }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && requestId) {
      fetchKycDetails(requestId);
    }
  }, [isOpen, requestId]);

  const fetchKycDetails = async (id) => {
    setLoading(true);
    try {
      const response = await KycVerificationApi.getKycDetails(id);
      setDetails(response);
    } catch (error) {
      console.error("Error fetching KYC details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setSubmitting(true);
      await KycVerificationApi.approveKyc(requestId);
      onActionComplete?.("APPROVED");
      onClose();
    } catch (error) {
      console.error("Error approving KYC:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reject reason.");
      return;
    }
    try {
      setSubmitting(true);
      await KycVerificationApi.rejectKyc(requestId, rejectReason);
      onActionComplete?.("REJECTED");
      onClose();
    } catch (error) {
      console.error("Error rejecting KYC:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Loading KYC details...</p>
        ) : details ? (
          <>
            {/* Header */}
            <h2 className="text-xl font-semibold mb-2">
              KYC Details for {details.userName}
            </h2>
            <p className="text-sm text-gray-600">
              User Type: <span className="font-medium">{details.roleType}</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Submitted:{" "}
              <span className="font-medium">
                {new Date(details.submitDate).toDateString()}
              </span>
            </p>

            {/* PAN & Aadhar */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-indigo-700 mb-2">
                PAN CARD
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <img
                    src={Base64StringToImage(details.panCardImage)}
                    alt="PAN"
                    className="h-40 w-full mx-auto object-contain bg-white rounded shadow"

                  />
                  <p className="text-s mt-1">Pan Card: {details.panNumber}</p>
                </div>
                
                <div className="text-center">
                  <img
                    src={Base64StringToImage(details.aadhaarCardImage)}
                    alt="Aadhar"
                    className="w-full h-40 mx-auto object-contain bg-white rounded shadow"
                  />
                  <p className="text-s mt-1">Aadhaar: {details.aadhaarNumber}</p>
                </div>
              </div>
            </div>

            {/* Selfie */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-center text-indigo-700 mb-2">SELFIE</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center col-span-2">
                  <img
                    src={Base64StringToImage(details.selfieImage)}
                    alt="Selfie"
                    className="h-40 w-full mx-auto object-contain bg-white rounded shadow"
                  />
                </div>
              </div>
            </div>

            {/* Reject Reason Input */}
            <div className="mb-4">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reject reason..."
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleReject}
                disabled={submitting}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {submitting ? "Rejecting..." : "Reject"}
              </button>
              <button
                onClick={handleApprove}
                disabled={submitting}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? "Approving..." : "Approve"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">No KYC details found.</p>
        )}
      </div>
    </div>
  );
};

export default KycDetailsModal;
