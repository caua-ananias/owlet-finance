# 🦉 Owlet Finance

![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Owlet Finance é um sistema de gestão financeira pessoal desenvolvido para demonstrar a implementação de uma arquitetura moderna Fullstack. O projeto utiliza uma API robusta em Java com Spring Boot e um Frontend responsivo e elegante com Next.js.

![Dashboard Preview](./assets/pagina-inicial.png)

## 🚀 Tecnologias

- **Backend:** Java 25, Spring Boot 4, Spring Data JPA, Validation, Lombok.
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Banco de Dados:** PostgreSQL (via Docker).
- **Infraestrutura:** Docker Compose.

## ⚙️ Arquitetura e Padrões

- **API RESTful:** Controllers, Services, Repositories.
- **DTO Pattern:** Separação estrita entre Entidades de Domínio e dados de transferência.
- **Mapper Pattern:** Conversão manual de objetos para garantir performance e controle.
- **Repository Pattern:** Abstração do acesso a dados.

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Docker & Docker Compose
- Java 21+
- Node.js 18+

### 1. Banco de Dados
Na raiz do projeto backend, suba o container do banco:
```
docker-compose up -d
```
###2. Backend (API)
```
cd owlet-backend
./mvnw spring-boot:run
```
A API estará rodando em: http://localhost:8080

    Nota: O sistema possui um DataSeeder que cria automaticamente um usuário de teste e transações iniciais.

###3. Frontend (Web)

```
cd owlet-frontend
npm install
npm run dev
```
Acesse o dashboard em: http://localhost:3000
## 🚧 Melhorias Futuras (Roadmap)

    [ ] Edição e Exclusão de Transações.

    [ ] Gráficos (Pizza/Barras) para análise de gastos.

    [ ] Autenticação JWT real (Login/Cadastro).

    [ ] CRUD de Categorias.

Desenvolvido por Cauã Ananias.
