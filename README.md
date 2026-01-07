# CRUD Node.js + MySQL (XAMPP)

Minimal Express REST API for CRUD using MySQL. You'll run MySQL via XAMPP; follow the instructions below to create the database and table in phpMyAdmin, then update `.env` and start the server.

SQL to create the database and `items` table (run in phpMyAdmin or mysql client):

```
CREATE DATABASE IF NOT EXISTS crud_db;
USE crud_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Steps:

- Copy `.env.example` to `.env` and set `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_DATABASE` to match your XAMPP MySQL credentials (usually `root` and empty password by default).
- Start XAMPP and ensure `MySQL` is running. Open phpMyAdmin and run the SQL above.
- Install dependencies and run the server:

```bash
npm install
npm run dev   # uses nodemon
# or: npm start
```

API endpoints (JSON):

- `GET /api/items` — list all items
- `GET /api/items/:id` — get single item
- `POST /api/items` — create item { name, description }
- `PUT /api/items/:id` — update item { name, description }
- `DELETE /api/items/:id` — delete item

Notes:

- I set up the code to use MySQL in XAMPP; you will create the database and update `.env` with credentials. The app expects a database named per `MYSQL_DATABASE`.
- If your XAMPP MySQL uses a password for `root`, set it in `.env`.
