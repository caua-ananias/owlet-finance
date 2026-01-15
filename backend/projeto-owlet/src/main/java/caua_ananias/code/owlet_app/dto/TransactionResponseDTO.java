package caua_ananias.code.owlet_app.dto;

import caua_ananias.code.owlet_app.domain.enums.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record TransactionResponseDTO(
        UUID id,
        String description,
        BigDecimal amount,
        LocalDate date,
        TransactionType type
) {}