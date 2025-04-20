import pool from "../config/db.js";

export const createExamService = async (qid, iid, title, total_marks) => {
    const result = await pool.query(
        "INSERT INTO exam (qid, iid, title, total_marks) VALUES ($1, $2, $3, $4) RETURNING *",
        [qid, iid, title, total_marks]
    );
    return result.rows[0];
}

export const getAllExamsService = async () => {
    const result = await pool.query("SELECT * FROM exam")
    return result.rows;
}

export const getExamByIdService = async (iid) => {
    const result = await pool.query("SELECT * FROM exam WHERE iid = $1", [iid])
    return result.rows;
}

export const updateExamService = async (qid, total_marks, iid) => {
    const result = await pool.query(
        "UPDATE exam set qid = $1, total_marks = $2 WHERE iid = $3 RETURNING *",
        [qid, total_marks, iid]
    );
    return result.rows[0];
}

export const deleteExamService = async (id) => {
    const result = await pool.query(
        "DELETE FROM exam WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}

export const createResultService = async (eid, sid, iid, final_marks, total_marks) => {
    const result = await pool.query(
        "INSERT INTO result (eid, sid, iid, final_marks, total_marks) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [eid, sid, iid, final_marks, total_marks]
    );
    return result.rows[0];
}

export const getResultByIdService = async (eid, id) => {
    const result = await pool.query(
        "SELECT * FROM result WHERE eid = $1, iid = $2",
        [eid, id]
    );
    return result.rows;
}

export const deleteResultService = async (id) => {
    const result = await pool.query(
        "DELETE FROM result WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}