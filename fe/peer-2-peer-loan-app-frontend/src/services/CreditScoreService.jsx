
import apiInterceptor from "../config/ApiInterceptor";
const CreditScoreApi = {
  getCreditScore: async () => {
    try {
      const response = await apiInterceptor.get(`/credit-score`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching credit score:", error);
      throw error;
    }
  },
};

export default CreditScoreApi;
