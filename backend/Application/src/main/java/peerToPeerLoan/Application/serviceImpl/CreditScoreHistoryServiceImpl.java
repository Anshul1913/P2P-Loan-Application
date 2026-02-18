package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.CreditScoreHistoryDTO;
import peerToPeerLoan.Application.entity.CreditScoreHistory;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.CreditScoreHistoryRepository;
import peerToPeerLoan.Application.repository.UserRepository;
import peerToPeerLoan.Application.service.CreditScoreHistoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreditScoreHistoryServiceImpl implements CreditScoreHistoryService {

    @Autowired
    private CreditScoreHistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CreditScoreHistoryDTO> getUserScoreHistory(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return historyRepository.findByUser(user).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public  CreditScoreHistoryDTO toDTO(CreditScoreHistory history) {
        CreditScoreHistoryDTO dto = new CreditScoreHistoryDTO();
        dto.setId(history.getId());
        dto.setUserId(history.getUser().getId());
        dto.setOldScore(history.getOldScore());
        dto.setNewScore(history.getNewScore());
        dto.setReason(history.getReason());
        dto.setUpdatedAt(history.getUpdatedAt());
        return dto;
    }

}

