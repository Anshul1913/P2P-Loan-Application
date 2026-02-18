package peerToPeerLoan.Application.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import peerToPeerLoan.Application.dto.KycDocumentDTO;
import peerToPeerLoan.Application.entity.KycDocument;

import java.util.List;

public interface KycDocumentService {
    Page<KycDocumentDTO> getAllKycDocuments(Pageable pageable);

    String getKycStatusOfCurrentUser();

    String getKycStatusByUserId(String userId);

    KycDocumentDTO uploadDocuments(KycDocumentDTO kycDocumentDTO, MultipartFile panCard, MultipartFile selfie, MultipartFile aadhaarCard);

    KycDocumentDTO updateDocument(KycDocumentDTO kycDocumentDTO, MultipartFile panCard, MultipartFile selfie, MultipartFile aadhaarCard);

    String approve(String kycDocumentId);

    String reject(String kycDocumentId,String rejectReason);

    KycDocumentDTO getAllKycDocumentsOfCurrentUser();

    KycDocumentDTO getAllKycDocumentsByUserId(String userId);

    boolean checkKycDocumentExistOrNotForCurrentUser();
}
