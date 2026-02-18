import React, { useState } from "react";
import axios from "axios";

const PayNow = ({ emiId, disabled }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayNow = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`/api/emis/${emiId}/pay`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePayNow}
        disabled={loading || disabled}
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && (
        <p className="mt-2 text-sm font-medium text-blue-700">{message}</p>
      )}
    </div>
  );
};

export default PayNow;
