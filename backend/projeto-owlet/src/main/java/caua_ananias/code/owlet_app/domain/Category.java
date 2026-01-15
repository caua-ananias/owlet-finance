package caua_ananias.code.owlet_app.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String icone;
}
