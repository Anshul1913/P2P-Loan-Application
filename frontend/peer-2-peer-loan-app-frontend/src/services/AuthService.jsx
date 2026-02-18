import apiInterceptor from "../config/ApiInterceptor";

const AuthApi = {
    login: async (loginDTO) => {
        try {
            const response = await apiInterceptor.post('/auth/login', loginDTO);
            console.log(response);
    
            return response.data;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            throw error.response.data;
        }
    },
    signupBorrower: async (signupDTO) => {
        try {
            console.log("Signup Borrower DTO:", signupDTO);
            
            const response = await apiInterceptor.post('/auth/signup-borrower', signupDTO);
            console.log(response);  
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            throw error.response.data;
        }
    },
    signupLender: async (signupDTO) => {
        try {
            console.log("Signup Lender DTO:", signupDTO);

            const response = await apiInterceptor.post('/auth/signup-lender', signupDTO);
            console.log(response);  
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            throw error.response.data;
        }
    }
};

export default AuthApi;
