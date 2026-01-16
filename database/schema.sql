CREATE DATABASE mindshare;

USE mindshare;

CREATE TABLE posts (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);