import apiInterceptor from "../config/ApiInterceptor";

const WalletApi = {
  getWalletBalance: async () => {
    try {
      const response = await apiInterceptor.get("/wallet/balance");
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      throw error;
    }
  },

  getTransactions: async () => {
    try {
      const response = await apiInterceptor.get("/transactions");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  addMoney: async (amount) => {
    try {
      console.log("Adding money:", amount);
      const response = await apiInterceptor.post(
        `/wallet/add?amount=${amount}`,
        amount
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Failed to add transaction:", error);
      throw error;
    }
  },
  withdraw: async (amount) => {
    try {
      console.log("Withdrawing money:", amount);
      const response = await apiInterceptor.post(
        `/wallet/withdraw?amount=${amount}`,
        amount
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Failed to add transaction:", error);
      throw error;
    }
  },
  payEmi: async (emiId, amount) => {
  try {
    console.log("Paying EMI:", emiId, amount);
    const response = await apiInterceptor.post(
      `/emi/pay-now/${emiId}?amount=${amount}`
    ); // ❌ remove request body
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to pay EMI:", error);
    throw error;
  }
}

};

export default WalletApi;
