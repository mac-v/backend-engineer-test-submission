CREATE TABLE transaction (
    id VARCHAR(255) PRIMARY KEY,
    block_id VARCHAR(255) REFERENCES block(id)
);