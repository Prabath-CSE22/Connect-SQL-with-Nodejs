import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getTakes() {
    const [rows] = await pool.query('SELECT * FROM kpp');
    return rows;
}

export async function getTake(id){
    const [rows] = await pool.query(`
        SELECT * FROM kpp WHERE Addmission_num = ?`, [id]);
    return rows[0];
}

export async function createTake(Addmission_num, name, DOB, Address, age){
    const [rows] = await pool.query(`
        INSERT INTO kpp (Addmission_num, name, DOB, Address, age) VALUES (?, ?, ?, ?, ?)`, [Addmission_num, name, DOB, Address, age]);
    return rows.insertId;
}

// const result = await createTake('527a1', 'prathibath', '2000-01-01', '123 Main St', 20);
// console.log(result);
