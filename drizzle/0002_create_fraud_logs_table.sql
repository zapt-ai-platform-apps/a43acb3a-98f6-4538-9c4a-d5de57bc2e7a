CREATE TABLE IF NOT EXISTS "fraud_logs" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "is_fraud" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);