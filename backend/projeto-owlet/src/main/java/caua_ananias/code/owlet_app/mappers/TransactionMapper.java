package caua_ananias.code.owlet_app.mappers;

import caua_ananias.code.owlet_app.dto.TransactionRequestDTO;
import caua_ananias.code.owlet_app.dto.TransactionResponseDTO;
import caua_ananias.code.owlet_app.domain.Transaction;
import caua_ananias.code.owlet_app.domain.User;

public final class TransactionMapper {

    private TransactionMapper() {}

    // Converte DTO de request para Entity
    public static Transaction fromRequestDTO(TransactionRequestDTO dto, User user) {
        Transaction t = new Transaction();
        t.setDescription(dto.description());
        t.setAmount(dto.amount());
        t.setDate(dto.date());
        t.setType(dto.type());
        t.setUser(user);
        return t;
    }

    // Converte Entity para DTO de request (se necessário)
    public static TransactionRequestDTO toRequestDTO(Transaction t) {
        return new TransactionRequestDTO(
                t.getDescription(),
                t.getAmount(),
                t.getDate(),
                t.getType(),
                t.getUser() != null ? t.getUser().getId() : null
        );
    }

    // Converte Entity para DTO de response (para controller)
    public static TransactionResponseDTO toResponseDTO(Transaction t) {
        return new TransactionResponseDTO(
                t.getId(),
                t.getDescription(),
                t.getAmount(),
                t.getDate(),
                t.getType()
        );
    }
}
