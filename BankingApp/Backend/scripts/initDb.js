// scripts/initDb.js
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const initDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false } 
        });

        console.log('Connected to database.');

        const schemaPath = path.join(__dirname, '../db/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        const statements = schema.split(';').filter(stmt => stmt.trim());

        for (const statement of statements) {
            if (statement.trim()) {
                await connection.execute(statement);
                console.log('Executed schema statement.');
            }
        }

        console.log('Database initialized successfully.');
        await connection.end();
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

initDb();