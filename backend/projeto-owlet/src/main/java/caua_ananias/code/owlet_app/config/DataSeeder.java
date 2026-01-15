package caua_ananias.code.owlet_app.config;

import caua_ananias.code.owlet_app.domain.Transaction;
import caua_ananias.code.owlet_app.domain.User;
import caua_ananias.code.owlet_app.domain.enums.TransactionType;
import caua_ananias.code.owlet_app.repositories.TransactionRepository;
import caua_ananias.code.owlet_app.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final JdbcTemplate jdbcTemplate;

    public DataSeeder(UserRepository userRepository, TransactionRepository transactionRepository, JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {

            UUID userId = UUID.fromString("d6559158-e8d1-41a4-bb92-041c8a755f7b");
            String sql = "INSERT INTO tb_users (id, name, surname, email, password, created_at) VALUES (?, ?, ?, ?, ?, ?)";

            jdbcTemplate.update(sql,
                    userId,
                    "Cauã",
                    "Ribeiro",
                    "caua@owlet.com",
                    "123456",
                    LocalDateTime.now()
            );

            User user = userRepository.findById(userId).orElseThrow();

            Transaction t1 = Transaction.builder()
                    .description("Salário Mensal")
                    .amount(new BigDecimal("5000.00"))
                    .date(LocalDate.now())
                    .type(TransactionType.INCOME)
                    .user(user)
                    .build();

            Transaction t2 = Transaction.builder()
                    .description("Pizza de Sexta")
                    .amount(new BigDecimal("50.00"))
                    .date(LocalDate.now())
                    .type(TransactionType.EXPENSE)
                    .user(user)
                    .build();

            Transaction t3 = Transaction.builder()
                    .description("Conta de Luz")
                    .amount(new BigDecimal("250.00"))
                    .date(LocalDate.now().minusDays(2))
                    .type(TransactionType.EXPENSE)
                    .user(user)
                    .build();

            transactionRepository.saveAll(List.of(t1, t2, t3));

            System.out.println("✅ DataSeeder: Banco populado com sucesso!");
        }
    }
}