import apiInterceptor from "../config/ApiInterceptor";
import LoanFundingDTO from "../dtos/LoanFundingDTO";

const LoanApi = {
  fetchLoansOfCurrentUser: async () => {
    try {
      const response = await apiInterceptor.get("/loan-request/my");
      console.log("Fetched loans for current user:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching loans for current user:", error);
      throw error;
    }
  },
  fetchTopLenders: async () => {
    try {
      const response = await apiInterceptor.get("/loan-funding/top-funders");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching top lenders:", error);
      throw error;
    }
  },
  fetchEmiDashboardData: async () => {
    try {
      const response = await apiInterceptor.get("/emi/dashboard");
      console.log("Fetched EMI dashboard data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching EMI dashboard data:", error);
      throw error;
    }
  },
  requestLoan: async (form) => {
    try {
      console.log("Submitting loan request with form data:", form);
      const response = await apiInterceptor.post("/loan-request/create", form);
      console.log("Loan request response:", response);
      return response.data;
    } catch (error) {
      console.error("Error requesting loan:", error);
      throw error;
    }
  },
  getLoanRequests: async () => {
    try {
      const response = await apiInterceptor.get("/loan-request/available");
      console.log("Fetched loan requests:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching loan requests:", error);
      throw error;
    }
  },
  getLoanDetail : async (id) => {
    try {
      const response = await apiInterceptor.get(`/loan-request/${id}`);
      console.log("Fetched loan details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching loan details:", error);
      throw error;
    }
  },
  fundLoan: async (loanId, amount) => {
    try {
      console.log(loanId, amount);
      
      const loanFundingDTO = new LoanFundingDTO(loanId, amount);
      console.log(loanFundingDTO);
      
      const response = await apiInterceptor.post(`/loan-funding/fund`, loanFundingDTO);

      console.log("Fund loan response:", response);
      // return response.data;
    } catch (error) {
      console.error("Error funding loan:", error.response.data);
      throw error;
    }
  },
  rejectLoan: async (loanId) => {
    try {
      const response = await apiInterceptor.post(`/loan-request/${loanId}/reject`);
      console.log("Reject loan response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error rejecting loan:", error);
      throw error;
    }
  }
};

export default LoanApi;
