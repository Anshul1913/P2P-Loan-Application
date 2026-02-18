package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import peerToPeerLoan.Application.dto.KycDocumentDTO;
import peerToPeerLoan.Application.entity.KycDocument;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.KycDocumentRepository;
import peerToPeerLoan.Application.repository.RoleRepository;
import peerToPeerLoan.Application.repository.UserRepository;
import peerToPeerLoan.Application.service.KycDocumentService;
import peerToPeerLoan.Application.service.UserService;
import peerToPeerLoan.Application.utils.constants.KycStatus;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KycDocumentServiceImpl implements KycDocumentService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private KycDocumentRepository kycDocumentRepository;
    @Autowired
    private UserService userService;
    @Override
    public Page<KycDocumentDTO> getAllKycDocuments(Pageable pageable) {

        return kycDocumentRepository.findAll(pageable)

                .map(this::toDTO);
    }

    private KycDocumentDTO toDTO(KycDocument kycDocument){
        KycDocumentDTO kycDocumentDTO = new KycDocumentDTO();
        kycDocumentDTO.setKycStatus(kycDocument.getKycStatus().toString());
        kycDocumentDTO.setId(kycDocument.getId());
        kycDocumentDTO.setAadhaarNumber(kycDocument.getAadhaarNumber());
        kycDocumentDTO.setPanNumber(kycDocument.getPanNumber());
        kycDocumentDTO.setVerified(kycDocument.isVerified());
        kycDocumentDTO.setUserName(kycDocument.getUser().getName());
        kycDocumentDTO.setSubmitDate(kycDocument.getLastModifiedDate());
        kycDocumentDTO.setRoleType(kycDocument.getUser().getRole().getName());
        if(kycDocument.getAadhaarCardImage()!=null)
        {
            kycDocumentDTO.setAadhaarCardImage(Base64.getEncoder().encodeToString(kycDocument.getAadhaarCardImage()));
        }
        if(kycDocument.getPanCardImage()!=null)
        {
            kycDocumentDTO.setPanCardImage(Base64.getEncoder().encodeToString(kycDocument.getPanCardImage()));
        }
        if(kycDocument.getSelfieImage()!=null)
        {
            kycDocumentDTO.setSelfieImage(Base64.getEncoder().encodeToString(kycDocument.getSelfieImage()));
        }
        return kycDocumentDTO;
    }
    @Override
    public String getKycStatusOfCurrentUser() {
        User user = userService.getCurrentUser();
        KycDocument doc = kycDocumentRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("No KYC submitted"));
        return doc.getKycStatus().name();

    }

    @Override
    public String getKycStatusByUserId(String userId) {
        KycDocument doc = kycDocumentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No KYC submitted"));
        return doc.getKycStatus().name();
    }

    @Override
    public KycDocumentDTO uploadDocuments(KycDocumentDTO kycDocumentDTO, MultipartFile panCard, MultipartFile selfie, MultipartFile aadhaarCard) {
        User user = userService.getCurrentUser();
        System.out.println("user "+ user);
//        KycDocument doc = kycDocumentRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        if (doc.getKycStatus().equals(KycStatus.APPROVED)) {
//            throw new ResourceNotFoundException("KYC already approved.");
//        }
        KycDocument doc = new KycDocument();
doc.setKycStatus(KycStatus.PENDING);
        doc.setUser(user);
        doc.setPanNumber(kycDocumentDTO.getPanNumber());
        doc.setAadhaarNumber(kycDocumentDTO.getAadhaarNumber());
        try {
            doc.setPanCardImage(panCard.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {
            doc.setAadhaarCardImage(aadhaarCard.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {
            doc.setSelfieImage(selfie.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        doc.setKycStatus(KycStatus.PENDING);
        doc.setVerified(false);

        KycDocument saved = kycDocumentRepository.save(doc);
        return toDTO(saved);
    }

    @Override
    public KycDocumentDTO updateDocument(KycDocumentDTO kycDocumentDTO, MultipartFile panCard, MultipartFile selfie, MultipartFile aadhaarCard) {
        KycDocument doc = kycDocumentRepository.findById(kycDocumentDTO.getId()).get();
        if (doc.getKycStatus().equals(KycStatus.APPROVED)) {
            throw new ResourceNotFoundException("KYC already approved.");
        }
        doc.setPanNumber(kycDocumentDTO.getPanNumber());
        doc.setAadhaarNumber(kycDocumentDTO.getAadhaarNumber());
        try {
            doc.setPanCardImage(panCard.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {
            doc.setAadhaarCardImage(aadhaarCard.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {
            doc.setSelfieImage(selfie.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        doc.setKycStatus(KycStatus.PENDING);
        doc.setVerified(false);

        KycDocument saved = kycDocumentRepository.save(doc);
        return toDTO(saved);
    }

    @Override
    public String approve(String kycDocumentId) {
        KycDocument doc = kycDocumentRepository.findById(kycDocumentId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC not found"));

        doc.setKycStatus(KycStatus.APPROVED);
        doc.setVerified(true);
        kycDocumentRepository.save(doc);
        return "KYC Approved";
    }

    @Override
    public String reject(String kycDocumentId,String rejectReason) {
        KycDocument doc = kycDocumentRepository.findById(kycDocumentId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC not found"));

        doc.setKycStatus(KycStatus.REJECTED);
        doc.setVerified(false);
        doc.setRejectReason(rejectReason);
        kycDocumentRepository.save(doc);
        return doc.getRejectReason();
    }

    @Override
    public KycDocumentDTO getAllKycDocumentsOfCurrentUser() {
        User user = userService.getCurrentUser();
        KycDocument document= kycDocumentRepository.findByUser(user).get();
        return toDTO(document);
    }

    @Override
    public KycDocumentDTO getAllKycDocumentsByUserId(String id) {
        KycDocument kycDocument = kycDocumentRepository.findById(id).get();
        return toDTO(kycDocument);
    }

    @Override
    public boolean checkKycDocumentExistOrNotForCurrentUser() {
        User user = userService.getCurrentUser();
        Optional<KycDocument> kycDocument = kycDocumentRepository.findByUser(user);
        return kycDocument.isPresent();
    }
}
