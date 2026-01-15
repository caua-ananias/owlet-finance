package caua_ananias.code.owlet_app.repositories;

import caua_ananias.code.owlet_app.domain.Transaction;
import caua_ananias.code.owlet_app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    // Simples e direto. Busca todas as transações daquele usuário
    List<Transaction> findAllByUser(User user);

    // Busca a transação mais antiga (Primeira data)
    // Tradução: Ache a Primeira pelo Usuário Ordenando por Data Ascendente
    Optional<Transaction> findFirstByUserOrderByDateAsc(User user);

    // Busca a transação mais recente (Última data)
    // Tradução: Ache a Top 1 pelo Usuário Ordenando por Data Descendente
    Optional<Transaction> findTopByUserOrderByDateDesc(User user);
}