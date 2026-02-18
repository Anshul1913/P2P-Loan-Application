import apiInterceptor from "../config/ApiInterceptor";

const UserDetailApi = {
  getUserDetails: async () => {
    try {
      const response = await apiInterceptor.get(`/user-detail`);
      console.log(response);
      return response.data;
      
    //   if (!response.ok) throw new Error("Network response was not ok");
    //   return await response.json();
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
  
};

export default UserDetailApi;
