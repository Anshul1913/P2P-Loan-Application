import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import CreditScoreApi from "../../services/CreditScoreService";
import { useNavigate } from "react-router-dom"; // Import Navigate for navigation
import { useLocation } from "react-router-dom";

const CreditScoreGauge = () => {
  const [creditScore, setCreditScore] = useState(750);
  const navigate = useNavigate(); // Initialize Navigate for navigation
  const location = useLocation();
  const shouldHideViewDetails = location.pathname.includes("/credit-score");

  useEffect(() => {
    // Replace with your backend URL
    const fetchCreditScore = async () => {
      try {
        const response = await CreditScoreApi.getCreditScore();
        console.log(response);
        setCreditScore(response.score); // Expected score range: 300 - 900
      } catch (error) {
        console.error("Error fetching credit score:", error);
        setCreditScore(null); // Handle error case
      }
    };
    fetchCreditScore();
  }, []);

  const getScoreLabel = (score) => {
    if (score >= 800) return "Excellent";
    if (score >= 700) return "Very Good";
    if (score >= 600) return "Good";
    if (score >= 500) return "Fair";
    return "Poor";
  };

  // Normalize score from 0 to 1 (300–900 scale)
  const normalizedScore = creditScore ? (creditScore - 300) / 600 : 0;
  const handleViewDetailsClick = () => {
    console.log("View details clicked");
    navigate("/credit-score-details"); // Example navigation, adjust as needed
    // You can navigate to a details page or show a modal here
  };
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Credit Score</h2>

      {creditScore !== null ? (
        <>
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={30}
            arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
            colors={["#EA4228", "#F58B00", "#F6D433", "#5BE12C", "#00C49F"]}
            percent={normalizedScore}
            arcPadding={0.02}
            textColor="#000000"
            hideText={true}
            needleColor="#000"
            animate={false}
            arcWidth={0.3}
          />
          <div className="mt-4 text-3xl font-bold">{creditScore}</div>
          <div className="text-green-600 font-semibold">
            {getScoreLabel(creditScore)}
          </div>
          {!shouldHideViewDetails && (
            <div
              className="text-indigo-600 underline cursor-pointer font-semibold"
              onClick={() => handleViewDetailsClick()}
            >
              view details
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CreditScoreGauge;
