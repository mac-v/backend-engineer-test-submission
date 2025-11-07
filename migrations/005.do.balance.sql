CREATE TABLE balance (
    address VARCHAR(255) PRIMARY KEY,
    balance BIGINT DEFAULT 0 CHECK (balance > 0)
);