class KycDocumentDTO{
    constructor(id, panNumber, aadhaarNumber, kycStatus,
         panCardImage, selfieImage, aadhaarCardImage,
          isVerified) {  
     this.id=id;
     this.panNumber=panNumber;
     this.aadhaarNumber=aadhaarNumber;
     this.kycStatus=kycStatus;
     this.panCardImage=panCardImage;
     this.selfieImage=selfieImage;
     this.aadhaarCardImage=aadhaarCardImage;
     this.isVerified=isVerified;

    
    }
}
export default KycDocumentDTO;