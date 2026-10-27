## BookVault
This application is a passion project as this is one of my hobbies (Made it for fun).

## Disclaimer
This project/application is created as a passion project, and for my learning journey only. It is not intended for commercial use. All features and functionalities are experimental and built for practice. Currently, this project/application is still unfinished as I'm currently occupied on my studies.

## Technologies Used
** Frontend **
-- React
-- Tailwind CSS
-- shadcn/ui
-- React Router

** Backend **
-- Springboot (Java)
-- Spring Security
-- Spring Data JPA (Hibernate)
-- Maven
-- Express ( to be made as another practice, backend only)

** Database & Caching**
-- Supabase (PostgreSQL)
-- Supabase CLI (local development)
-- Redis (Caching)

** Tools **
-- Docker
-- IntelliJ IDEA

## Setup
1. Clone Repository
2. Start the database using the Supabase CLI (from the project root) or use a hosted Supabase Project
3. (Optional) Start Redis via Docker
4. Add environmental variables
5. Run the backend: `cd server` then `.\mvnw spring-boot:run`
6. Run the frontend from the project root: `npm install` then `npm run dev`

## Environment Variables

### Backend
The backend uses Spring profiles. `application.properties` holds the shared settings, and the active profile loads a second file on top of it. The default profile is `local` (`application-local.properties`). To use another one, set `SPRING_PROFILES_ACTIVE`, for example `SPRING_PROFILES_ACTIVE=prod`.
Properties in `application-local.properties`:
- `spring.datasource.url` - Database url (the local Supabase CLI database runs on port `54322`)
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - Secret used to sign JWTs (at least 32 characters)
- `allowed.origins` - Frontend origin allowed by CORS (for example `http://localhost:5173`)
- `spring.data.redis.host` - Redis host
- `spring.data.redis.port` - Redis port

Shared in `application.properties`:

- `jwt.expiration` - Token lifetime in milliseconds (`86400000` is 24 hours)
- `spring.jpa.hibernate.ddl-auto=validate` - The app doesn't create tables, so the schema must already exist

Redis is optional. If it's unavailable, the app falls back to the database.

NOTES: 
The database schema is still a work in progress. Tables are created automatically
by Hibernate on the first run (local profile uses `ddl-auto=update`), but database triggers and row-level security policies are not included yet.
Migrations for them are planned, so some features that depend on them may not
work on a fresh local database.
