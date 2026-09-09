CREATE TABLE IF NOT EXISTS users(
    email TEXT UNIQUE NOT NULL,
    hash_password TEXT NOT NULL
);