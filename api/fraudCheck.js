import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { fraud_logs } from '../drizzle/fraudSchema.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    const normalizedEmail = email.toLowerCase();
    const isFraud = normalizedEmail.includes("fraud");

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    await db.insert(fraud_logs).values({
      email,
      is_fraud: isFraud
    });

    console.log("Fraud check completed for email:", email);
    res.status(200).json({ isFraud });
  } catch (error) {
    console.error("Error in fraudCheck:", error);
    Sentry.captureException(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}