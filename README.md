# AuthGateway - Secure Authentication System

A robust Spring Boot application implementing JWT-based authentication and role-based access control (RBAC) for managing users, students, and administrative functions.

## 🚀 Features

- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Role-Based Access Control**: ADMIN, USER, and STUDENT roles
- **Secure Password Encryption**: BCrypt password hashing
- **RESTful API**: Clean, well-structured REST endpoints
- **MySQL Database**: Persistent data storage with JPA/Hibernate
- **Global Exception Handling**: Consistent error responses
- **CORS Configuration**: Cross-origin resource sharing support

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Java | 17 |
| Framework | Spring Boot | 3.2.5 |
| Database | MySQL | 8.x |
| ORM | Spring Data JPA | Included |
| Security | Spring Security | Included |
| JWT | JJWT | 0.12.6 |
| Build Tool | Maven | 3.9.x |

## 📋 Prerequisites

Before running this application, ensure you have:

- **Java 17** or higher installed
- **Maven 3.9+** installed
- **MySQL 8.x** running
- **Git** for cloning the repository

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/authgateway.git
cd authgateway
```

### 2. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE authgateway_db;
```

### 3. Update Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Update these values
spring.datasource.url=jdbc:mysql://localhost:3306/authgateway_db?createDatabaseIfNotExist=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# Generate a secure JWT secret (256+ bits)
# Use: openssl rand -base64 64
jwt.secret=YourSecureBase64EncodedSecretKeyHere
```

### 4. Build the Project

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Health Check
```http
GET /api/auth/health
```

### User Endpoints

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer {token}
```

#### Get User by ID
```http
GET /api/users/{id}
Authorization: Bearer {token}
```

#### Get All Users (Admin Only)
```http
GET /api/users
Authorization: Bearer {token}
```

#### Update User
```http
PUT /api/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

#### Delete User (Admin Only)
```http
DELETE /api/users/{id}
Authorization: Bearer {token}
```

### Student Endpoints

#### Create Student Profile
```http
POST /api/students/user/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": "STU001",
  "dateOfBirth": "2000-01-15",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "enrollmentYear": 2023,
  "major": "Computer Science",
  "totalBudget": 50000.00
}
```

#### Get Student by ID
```http
GET /api/students/{id}
Authorization: Bearer {token}
```

#### Get All Students (Admin Only)
```http
GET /api/students
Authorization: Bearer {token}
```

#### Update Student
```http
PUT /api/students/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "major": "Software Engineering",
  "totalBudget": 55000.00
}
```

### Admin Endpoints

#### Admin Dashboard
```http
GET /api/admin/dashboard
Authorization: Bearer {token}
```

#### User Statistics
```http
GET /api/admin/users/stats
Authorization: Bearer {token}
```

## 🔐 Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access to all endpoints, can manage all users and students |
| **USER** | Can view and update own profile |
| **STUDENT** | Can view and update own student profile, limited user access |

## 🗂️ Project Structure

```
auth.gateway/
├── src/
│   ├── main/
│   │   ├── java/com/authgateway/
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AdminController.java
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── StudentController.java
│   │   │   │   └── UserController.java
│   │   │   ├── dto/
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── ErrorResponse.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── StudentRequest.java
│   │   │   │   ├── StudentResponse.java
│   │   │   │   └── UserResponse.java
│   │   │   ├── exception/
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── model/
│   │   │   │   ├── Role.java
│   │   │   │   ├── Student.java
│   │   │   │   └── User.java
│   │   │   ├── repository/
│   │   │   │   ├── StudentRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   ├── security/
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── JwtUtil.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── StudentService.java
│   │   │   │   └── UserService.java
│   │   │   └── AuthGatewayApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## 🧪 Testing with Postman

### 1. Register a New User

**Request:**
```
POST http://localhost:8080/api/auth/register
```

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "ADMIN"
}
```

### 2. Login

**Request:**
```
POST http://localhost:8080/api/auth/login
```

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Copy the token from the response.**

### 3. Access Protected Endpoint

**Request:**
```
GET http://localhost:8080/api/users/me
```

**Headers:**
```
Authorization: Bearer {paste_your_token_here}
```

## 🔒 Security Features

1. **Password Encryption**: All passwords are hashed using BCrypt
2. **JWT Tokens**: Stateless authentication with configurable expiration
3. **CORS Protection**: Configured for specific origins
4. **Method-Level Security**: `@PreAuthorize` annotations on endpoints
5. **Global Exception Handling**: Consistent error responses

## 🐛 Troubleshooting

### Common Issues

**Issue: Cannot connect to MySQL**
- Solution: Ensure MySQL is running and credentials are correct in `application.properties`

**Issue: JWT token validation fails**
- Solution: Check that the JWT secret is properly configured and at least 256 bits

**Issue: Build fails**
- Solution: Ensure Java 17 is installed: `java -version`

**Issue: Port 8080 already in use**
- Solution: Change port in `application.properties`: `server.port=8081`

## 📝 Development

### Adding New Endpoints

1. Create a new controller in `controller/` package
2. Add service methods in `service/` package
3. Update security configuration if needed
4. Add validation using `@Valid` annotations

### Generating JWT Secret

```bash
openssl rand -base64 64
```

### Creating Additional Roles

1. Add role to `Role` enum
2. Update `SecurityConfig` with role-specific rules
3. Add role-specific endpoints in controllers

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot Team
- Spring Security Team
- JJWT Library

---

**Happy Coding! 🚀**