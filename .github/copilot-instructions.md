# Project Guidelines

## Implementation Philosophy

**Strict Requirement**: Implement ONLY what is explicitly requested. Do not add:
- Extra CRUD operations unless specifically asked
- Additional validation logic beyond what's mentioned
- Helper methods or convenience functions
- Duplicate checking or business logic validation unless specified

## When Creating Repository Classes

- Include only the methods that are directly required for the explicitly requested functionality
- Do not add `findBy*` or `existsBy*` methods unless explicitly requested
- Use only JpaRepository base methods (save, findById, findAll, deleteById) unless custom queries are specifically asked for

## When Creating Service Classes

- Implement only the operations explicitly mentioned in the requirements
- Do not add validation logic (duplicate checking, business rules) unless explicitly requested
- Keep service methods minimal and focused on the requested feature only

## General Guidelines

- If a requirement mentions "save", create only the save/create functionality
- If unsure whether to add a feature, DON'T add it—implement the minimum required
- Ask for clarification before adding any feature not explicitly mentioned
- Create a global exception handler while creating the project for the first time

## Project Standards

### Technology Stack
- Use REST API principles for all endpoints
- Use PostgreSQL as the database
- Always use DTO pattern (separate request/response DTOs). Create separate folder for request and response dto objects
- Include validation annotations on DTOs and entities
- Implement global exception handling with @RestControllerAdvice

### Naming Conventions
- **Service Interfaces**: Prefix with `I` (e.g., `IBuyerInfoService`)
- **Service Implementations**: Use class name without `I` (e.g., `BuyerInfoService`)

### Folder Structure
- Place service interfaces in: `interface/` folder
- Place service implementations in: `services/` folder
- Example:
  ```
  coding/context/compass/
    ├── interface/
    │   └── IBuyerInfoService.java
    └── services/
        └── BuyerInfoService.java
  ```

### What NOT to Include by Default
- Do NOT add duplicate checking unless explicitly requested
- Do NOT add extra finder methods in repositories unless specified
- Do NOT implement full CRUD if only save/create is requested

## PostgreSQL & Database Guidelines

### Configuration Standards
- Use `spring.jpa.hibernate.ddl-auto=update` for development
- Always set `spring.jpa.show-sql=true` and `spring.jpa.properties.hibernate.format_sql=true` for debugging
- Use PostgreSQL-specific dialect: `org.hibernate.dialect.PostgreSQLDialect`
- Default port configuration: Use 8081 to avoid conflicts with common services on 8080

### Entity Design
- Use `@GeneratedValue(strategy = GenerationType.IDENTITY)` for auto-generated IDs
- Use snake_case for database column names via `@Column(name = "column_name")`
- Always specify nullable constraints: `nullable = false` for required fields
- Set appropriate `@Size` constraints matching database column definitions
- Use `@Table(name = "table_name")` to explicitly name tables

### Data Types Mapping
- String fields: Use `@Size(max = X)` - default VARCHAR(255) for short text
- Email: Use `@Email` validation with `@Size(max = 150)`
- Phone: Use String type with `@Size(max = 20)`
- Dates: Use `LocalDate` or `LocalDateTime` from `java.time` package (not `java.util.Date`)

### Repository Best Practices
- Extend `JpaRepository<Entity, ID>` for standard operations
- Do NOT add custom query methods unless explicitly requested
- Do NOT add `existsBy*` or `findBy*` methods unless specifically needed
- Use `@Repository` annotation on repository interfaces

### Transaction Management
- Service methods that modify data should be annotated with `@Transactional` if explicitly handling complex operations
- For simple save operations, rely on Spring Data JPA's default transaction handling
- Do NOT add `@Transactional` unless multi-step operations require it

### Query Guidelines
- Avoid N+1 problems: Use `@EntityGraph` or JOIN FETCH only when explicitly optimizing queries
- Do NOT write native SQL queries unless JPA/JPQL cannot achieve the requirement
- Prefer JPA method naming conventions over `@Query` annotations for simple queries

### Connection & Performance
- Use HikariCP (default in Spring Boot) - do not configure connection pool unless explicitly required
- Do NOT add database indexes unless performance optimization is explicitly requested
- Do NOT add caching (`@Cacheable`) unless explicitly requested

## Frontend Guidelines (React + Vite)
- implement proper routing with React Router and a dedicated routes file

### Project Structure
- Place components in: `src/components/` folder
- Each component should have its own CSS file with the same name (e.g., `Component.jsx` and `Component.css`)
- Keep components focused and single-purpose

### Component Standards
- Use functional components with hooks (useState, useEffect)
- Use descriptive prop names and destructure props in function parameters
- Handle loading states and error states explicitly in the UI

### API Integration
- Use fetch API for HTTP requests
- Always include error handling with try-catch blocks
- Use async/await for cleaner async code
- Display user-friendly error messages in the UI

### Styling Guidelines
- Design modern, responsive UI using CSS Flexbox or Grid
- Use media queries for mobile responsiveness
- Keep CSS modular and scoped to components (avoid global styles)
- Use consistent spacing, font sizes, and color schemes for a polished look
- Use clean and minimalistic design with soft shadows, smooth transitions, hover effects for a modern aesthetic
- Apply a light theme using css variables for easy theming and maintainability
- Generate CSS and HTML in separate sections
- Don't set the container and buttons with rounded edges
- Only highlight the button when hovered and don't add jump transition

### State Management
- Use useState for local component state
- Pass callback functions as props for parent-child communication
- Keep state as close to where it's used as possible

### Best Practices
- Do NOT add extra features or components unless explicitly requested
- Implement only the requested functionality
- Use meaningful variable and function names
- Add loading spinners for async operations
- Display success and error messages to users
- Include proper form validation when working with forms
