# How to Run the Maker-Checker Dashboard

This guide explains how to run the Maker-Checker Dashboard locally and the basics for deploying to the cloud.

---

## 1. Prerequisites

- Node.js & npm (for frontend)
- Java 17+ & Maven (for backend)
- MySQL Server (local) or Cloud SQL (GCP)
- [Optional] Google Cloud SDK, Terraform (for GCP deployment)

---

## 2. Database Setup

1. **Local MySQL:**

   - Install MySQL.
   - Create a database:
     ```sql
     CREATE DATABASE aibers_db;
     ```
   - Create a user and grant privileges:
     ```sql
     CREATE USER 'youruser'@'localhost' IDENTIFIED BY 'yourpassword';
     GRANT ALL PRIVILEGES ON aibers_db.* TO 'youruser'@'localhost';
     FLUSH PRIVILEGES;
     ```

2. **Seed Users:**

   - Insert a Maker and a Checker:
     ```sql
     INSERT INTO user (username, password, role) VALUES ('maker1', 'makerpass', 'Maker');
     INSERT INTO user (username, password, role) VALUES ('checker1', 'checkerpass', 'Checker');
     ```
   - (You may need to let the Spring Boot backend auto-create the tables first by running it once.)

---

## 3. Backend Setup

1. **Configure database credentials in `backend/src/main/resources/application.properties`:**
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/aibers_db
   spring.datasource.username=youruser
   spring.datasource.password=yourpassword
   jwt.secret=YourJWTSecretKey
   ```

2. **Start the backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   - The backend runs on `http://localhost:8080`

---

## 4. Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **(Optional) Add a proxy to backend in `frontend/package.json`:**
   ```json
   "proxy": "http://localhost:8080"
   ```

3. **Start the frontend:**
   ```bash
   npm start
   ```
   - The frontend runs at `http://localhost:3000`

---

## 5. Usage

- Go to [http://localhost:3000](http://localhost:3000) in your browser.
- Log in with the seeded users:
  - Maker: `maker1` / `makerpass`
  - Checker: `checker1` / `checkerpass`
- Makers can create requests; Checkers can approve/reject them.

---

## 6. GCP/Cloud Deployment (Summary)

- **Database:** Use Terraform or GCP Console to provision Cloud SQL.
- **Backend:** Build with Maven, containerize if needed, deploy to Cloud Run or App Engine using the provided YAML.
- **Frontend:** Build with `npm run build`, deploy to Firebase Hosting or GCS bucket.

---

## 7. Troubleshooting

- Ensure MySQL is running and credentials are correct.
- Check backend logs for errors on startup.
- If you change backend URL, update the frontend proxy or API endpoints accordingly.

---

## 8. Security Notes

- In production, use hashed passwords (BCrypt).
- Store JWT secrets securely (not in source code).
- Restrict database access.

---

## 9. Extending

- Add registration endpoints.
- Implement password hashing.
- Add audit logging.
- Add pagination/filtering to requests.

---

**For further help, see `architecture.md` for design details.**
