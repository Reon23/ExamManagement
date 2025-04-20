import pool from "../config/db.js";

// Create required tables

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
    `;

    try {
        pool.query(queryText);
        console.log("User table created if not exits");
    }
    catch(error) {
        console.log("Error creating users table : ", error);
    }
}

export const createInstructorTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS instructor (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `;

    try {
        pool.query(queryText);
        console.log("Instructor table created if not exits");
    }
    catch (error) {
        console.log("Error creating instructor table : ", error);
    }
}

export const createStudentTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS student (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `;

    try {
        pool.query(queryText);
        console.log("Student table created if not exits");
    }
    catch (error) {
        console.log("Error creating student table : ", error);
    }
}

export const createQuestionBankTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS question_bank (
        id SERIAL PRIMARY KEY,
        subject VARCHAR(100) NOT NULL,
        owner_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(owner_id) REFERENCES instructor(id)
    );
    `;

    try {
        pool.query(queryText);
        console.log("Question Bank table created if not exits");
    }
    catch (error) {
        console.log("Error creating question bank table : ", error);
    }
}

export const createQuestionTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS question (
        qbid INTEGER NOT NULL,
        qid VARCHAR(255) PRIMARY KEY NOT NULL,
        question VARCHAR(255) NOT NULL,
        option1 VARCHAR(255) NOT NULL,
        option2 VARCHAR(255) NOT NULL,
        option3 VARCHAR(255) NOT NULL,
        option4 VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        marks INT NOT NULL,
        FOREIGN KEY(qbid) REFERENCES question_bank(id) ON DELETE CASCADE
    )
    `;

    try {
        pool.query(queryText);
        console.log("Questions table created if not exits");
    }
    catch (error) {
        console.log("Error creating questions table : ", error);
    }
}

export const createExamTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS exam (
        id SERIAL PRIMARY KEY,
        qid INTEGER NOT NULL,
        iid INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        total_marks INTEGER NOT NULL,
        FOREIGN KEY(qid) REFERENCES question_bank(id) ON DELETE CASCADE,
        FOREIGN KEY(iid) REFERENCES instructor(id)
    );
    `;

    try {
        pool.query(queryText);
        console.log("Exam table created if not exits");
    }
    catch (error) {
        console.log("Error creating exam table : ", error);
    }
}

export const createResultTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        eid INTEGER NOT NULL,
        sid INTEGER NOT NULL,
        iid INTEGER NOT NULL,
        final_marks INTEGER NOT NULL,
        total_marks INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(eid) REFERENCES exam(id) ON DELETE CASCADE,
        FOREIGN KEY(sid) REFERENCES student(id) ON DELETE CASCADE,
        FOREIGN KEY(iid) REFERENCES instructor(id)
    );
    `;

    try {
        pool.query(queryText);
        console.log("Result table created if not exits");
    }
    catch (error) {
        console.log("Error creating result table : ", error);
    }
}