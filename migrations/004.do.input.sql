CREATE TABLE input (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) REFERENCES transaction(id),
    spent_output_id INTEGER REFERENCES output(id),
    input_index INTEGER NOT NULL CHECK (input_index > 0)
);