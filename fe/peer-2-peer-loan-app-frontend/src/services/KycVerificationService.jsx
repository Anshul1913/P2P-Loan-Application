import apiInterceptor from "../config/ApiInterceptor";
import KycDocumentDTO from "../dtos/KycDocumentDTO";

const KycVerificationApi = {
  verifyKycStudent: async (form, aadhaarNumber) => {
    try {
          const dto = new KycDocumentDTO(
            form.id,
            form.panNumber,
            aadhaarNumber,
            form.kycStatus,
            null,
            null,
            null,
            form.isVerified
          );
          console.log(dto);

        console.log(form);
     
      const data = new FormData();
      data.append("panCard", form.panFile);
      data.append("selfie", form.selfieFile);
      data.append("aadhaarCard", form.aadhaarFile);
      data.append(
        "kycDocumentDTO",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );

      console.log("Form Data:", data);

      const response = await apiInterceptor.post("/kyc/upload", data);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      throw error.response.data;
    }
  },
  getAllKycRequests: async (page,size) => {
    try {
      const response = await apiInterceptor.get(`/kyc/document/all?page=${page}&size=${size}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
      throw error;
    }
  },
  approveKyc: async (id) => {
    try {
      const response = await apiInterceptor.put(`/kyc/admin/${id}/approve`);
      console.log("KYC Approved:", response);
      return response.data;
    } catch (error) {
      console.error("Error approving KYC:", error);
      throw error;
    }
  },
  rejectKyc: async (id, reason) => {
    try {
      const response = await apiInterceptor.put(`/kyc/admin/${id}/reject?rejectReason=${reason}`, );
      console.log("KYC Rejected:", response);

      return response.data;
    } catch (error) {
      console.error("Error rejecting KYC:", error);
      throw error;
    }
  },
  getKycDetails: async (id) => {
    try {
      const response = await apiInterceptor.get(`/kyc/document/${id}`);
      console.log("KYC Details:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching KYC details:", error);
      throw error;
    } 
  },
  
  checkDocumentIsExist: async () => {
    try {
      const response = await apiInterceptor.get(`/kyc/document-is-exist`);
      console.log("KYC Document Existence Check:", response);
      return response.data;
    } catch (error) {
      console.error("Error checking KYC document existence:", error);
      throw error;
    } 
  },
};

export default KycVerificationApi;
