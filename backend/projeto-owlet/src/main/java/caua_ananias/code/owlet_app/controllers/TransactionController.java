package caua_ananias.code.owlet_app.controllers;

import caua_ananias.code.owlet_app.dto.TransactionRequestDTO;
import caua_ananias.code.owlet_app.dto.TransactionResponseDTO;
import caua_ananias.code.owlet_app.services.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> create(@RequestBody @Valid TransactionRequestDTO body) {
        var response  = transactionService.create(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> listAll() {
        var list = transactionService.listAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(transactionService.findById(id));
    }
}
