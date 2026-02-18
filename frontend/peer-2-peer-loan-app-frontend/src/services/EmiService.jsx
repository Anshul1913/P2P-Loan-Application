import apiInterceptor from "../config/ApiInterceptor";

const EmiApi = {
  fetchAllEmiOfCurentUser: async (page,size) => {
    try {
        const response = await apiInterceptor.get(`/emi?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
  },
};

export default EmiApi;
