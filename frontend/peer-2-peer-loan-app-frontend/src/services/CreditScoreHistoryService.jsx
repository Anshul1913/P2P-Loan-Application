
import apiInterceptor from "../config/ApiInterceptor";
const CreditScoreHistoryApi = {
  getCreditScoreHistory: async () => {
    try {
      const response = await apiInterceptor.get(`/credit-score-history`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching credit score:", error);
      throw error;
    }
  },
};

export default CreditScoreHistoryApi;
