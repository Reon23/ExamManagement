import pool from '../config/db.js';

export const createInstructor = async (name, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO instructor (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

export const createStudent = async (first_name, last_name, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO student (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, hashedPassword]
  );
  return result.rows[0];
};

export const findInstructorByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM instructor WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

export const findStudentByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM student WHERE email = $1',
    [email]
  );
  return result.rows[0];
};
