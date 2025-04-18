import pool from "../config/db.js";

export const createQuestionBankService = async (subject, owner_id) => {
    const result = await pool.query(
        'INSERT INTO question_bank (subject, owner_id) VALUES ($1, $2) RETURNING *',
        [subject, owner_id]
    );
    return result.rows[0];
}

export const getAllQuestionBanksService = async () => {
    const result = await pool.query(
        'SELECT * FROM question_bank'
    );
    return result.rows;
}

export const deleteQuestionBankService = async (questionBankId, owner_id) => {
    const result = await pool.query(
        'DELETE FROM question_bank WHERE id = $1 AND owner_id = $2 RETURNING *',
        [questionBankId, owner_id]
    );
    return result.rows[0];
}


export const getQuestionBankByIdService = async (owner_id) => {
    const result = await pool.query(
        'SELECT * FROM question_bank WHERE owner_id = $1 ORDER BY created_at DESC',
        [owner_id]
    );
    return result.rows;
}

export const addQuestionService = async (questionBankId, question_id, question, option1, option2, option3, option4, answer, marks) => {
    const result = await pool.query(
        "INSERT INTO question (qbid, qid, question, option1, option2, option3, option4, answer, marks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [questionBankId, question_id, question, option1, option2, option3, option4, answer, marks]
    );
    return result.rows[0];
}

export const fetchQuestionsService = async (questionBankId) => {
    const result = await pool.query(
        "SELECT * FROM question WHERE qbid = $1",
        [questionBankId]
    );
    return result.rows;
}

export const updateQuestionService = async (questionBankId, question_id, question, option1, option2, option3, option4, answer, marks) => {
    const result = await pool.query(
        "UPDATE question SET question = $1, option1 = $2, option2 = $3, option3 = $4, option4 = $5, answer = $6, marks = $7 WHERE qbid = $8 AND qid = $9 RETURNING *",
        [question, option1, option2, option3, option4, answer, marks, questionBankId, question_id]
    );
    return result.rows[0];
}

export const deleteQuestionService = async (questionBankId, question_id) => {
    const result = await pool.query(
        'DELETE FROM question WHERE qid = $1 AND qbid = $2 RETURNING *',
        [question_id, questionBankId]
    );
    return result.rows[0];
}
