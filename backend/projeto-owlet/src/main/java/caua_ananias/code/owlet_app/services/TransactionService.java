package caua_ananias.code.owlet_app.services;

import caua_ananias.code.owlet_app.dto.TransactionRequestDTO;
import caua_ananias.code.owlet_app.dto.TransactionResponseDTO;
import caua_ananias.code.owlet_app.mappers.TransactionMapper;
import caua_ananias.code.owlet_app.repositories.TransactionRepository;
import caua_ananias.code.owlet_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionResponseDTO create(TransactionRequestDTO data){
        var user = userRepository.findById(data.userId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + data.userId()));
        var transaction = TransactionMapper.fromRequestDTO(data, user);
        var savedTransaction = transactionRepository.save(transaction);
        return TransactionMapper.toResponseDTO(savedTransaction);
    }

    public List<TransactionResponseDTO> listAll() {
        // Busca tudo do banco, converte cada um para DTO e junta numa lista
        return transactionRepository.findAll()
                .stream()
                .map(TransactionMapper::toResponseDTO)
                .toList();
    }
}
