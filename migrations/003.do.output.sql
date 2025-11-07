CREATE TABLE output (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) REFERENCES transaction(id),
    address VARCHAR(255) NOT NULL,
    value BIGINT NOT NULL,
    output_index INTEGER NOT NULL CHECK (output_index > 0),
    is_spent BOOLEAN DEFAULT false
);
