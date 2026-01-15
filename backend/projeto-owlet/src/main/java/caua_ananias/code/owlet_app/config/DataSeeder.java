package caua_ananias.code.owlet_app.config;

import caua_ananias.code.owlet_app.domain.User;
import caua_ananias.code.owlet_app.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = User.builder()
                .id(UUID.fromString("d6559158-e8d1-41a4-bb92-041c8a755f7b")) // ID FIXO para funcionar com o Front
                .name("Cauã")
                .surname("Ribeiro")
                .email("caua@owlet.com")
                .password("123456")
                .build();
    }
}