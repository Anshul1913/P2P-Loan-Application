package peerToPeerLoan.Application.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import peerToPeerLoan.Application.dto.KycDocumentDTO;
import peerToPeerLoan.Application.service.KycDocumentService;

@RestController
@RequestMapping("/api/kyc")
public class KycDocumentController {

    @Autowired
    private KycDocumentService kycDocumentService;


    @GetMapping("/document/all")
    private ResponseEntity<?> getAllKycDocuments(@RequestHeader("Authorization") String token, Pageable pageable ){
        return ResponseEntity.ok(kycDocumentService.getAllKycDocuments(pageable));
    }
    @GetMapping("/document")
    private ResponseEntity<?> getAllKycDocumentsOfCurrentUser(@RequestHeader("Authorization") String token ){

        return ResponseEntity.ok(kycDocumentService.getAllKycDocumentsOfCurrentUser());
    }

    @GetMapping("/document-is-exist")
    private ResponseEntity<?> checkKycDocumentExistOrNotForCurrentUser(@RequestHeader("Authorization") String token ){

        return ResponseEntity.ok(kycDocumentService.checkKycDocumentExistOrNotForCurrentUser());
    }

    @GetMapping("/document/{userId}")
    private ResponseEntity<?> getAllKycDocumentsByUserId(@RequestHeader("Authorization") String token ,
                                                         @PathVariable String userId){

        return ResponseEntity.ok(kycDocumentService.getAllKycDocumentsByUserId(userId));
    }
    @GetMapping("/status")
    private ResponseEntity<?> getKycStatusOfCurrentUser(@RequestHeader("Authorization") String token ){

        return ResponseEntity.ok(kycDocumentService.getKycStatusOfCurrentUser());
    }
    @GetMapping("/status/{userId}")
    private ResponseEntity<?> getKycStatusByUserId(@RequestHeader("Authorization") String token,
                                                   @PathVariable String userId){
        return ResponseEntity.ok(kycDocumentService.getKycStatusByUserId(userId));
    }

    @PostMapping(value = "/upload",consumes = "multipart/form-data")
    private ResponseEntity<?> uploadDocuments(@RequestHeader("Authorization") String token,
                                          @RequestPart KycDocumentDTO kycDocumentDTO,
                                          @RequestPart("panCard") MultipartFile panCard,
                                          @RequestPart("selfie") MultipartFile selfie,
                                          @RequestPart("aadhaarCard") MultipartFile aadhaarCard){
        System.out.println(kycDocumentDTO);
        return ResponseEntity.ok(kycDocumentService.uploadDocuments(kycDocumentDTO,panCard,selfie,aadhaarCard));
    }

    @PutMapping(value = "/update",consumes = "multipart/form-data")
    private ResponseEntity<?> updateDocument(@RequestHeader("Authorization") String token,
                                             @RequestPart KycDocumentDTO kycDocumentDTO,
                                             @RequestPart("panCard") MultipartFile panCard,
                                             @RequestPart("selfie") MultipartFile selfie,
                                             @RequestPart("aadhaarCard") MultipartFile aadhaarCard){

        return ResponseEntity.ok(kycDocumentService.updateDocument(kycDocumentDTO,panCard,selfie,aadhaarCard));
    }
    @PutMapping("/admin/{kycDocumentId}/approve")
    private ResponseEntity<?> updateStatus(@RequestHeader("Authorization") String token,
                                           @PathVariable String kycDocumentId){
        return ResponseEntity.ok(kycDocumentService.approve(kycDocumentId));
    }
    @PutMapping("/admin/{kycDocumentId}/reject")
    private ResponseEntity<?> reject(@RequestHeader("Authorization") String token,
                                           @PathVariable String kycDocumentId,
                                            @RequestParam String rejectReason){
        return ResponseEntity.ok(kycDocumentService.reject(kycDocumentId,rejectReason));
    }

}
