import { 
    createExamService, 
    createResultService, 
    deleteExamService, 
    deleteResultService, 
    getAllExamsService, 
    getExamByIdService, 
    getResultByIdService, 
    updateExamService 
} from "../models/examModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const createExam = async (req, res) => {
    const { qid, iid, title, total_marks } = req.body;
    try {
        const exam = await createExamService(qid, iid, title, total_marks);
        handleResponse(res, 200, "Exam created sucessfully", exam);
    }
    catch (err) {
        console.error(err);
        handleResponse(res, 500, "Failed to create exam ")
    }
}

export const getAllExams = async (req, res) => {
    try {
        const exams = await getAllExamsService();
        if (!exams || exams.length === 0) return handleResponse(res, 404, "Exams not found");
        handleResponse(res, 200, "Exams fetched sucessfully", exams);
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch exams");
    }
}

export const getExamById = async (req, res) => {
    const iid = req.params.id;
    try {
        const exams = await getExamByIdService(iid)
        if (!exams || exams.length === 0) return handleResponse(res, 404, "Exams not found");
        handleResponse(res, 200, "Exams fetched sucessfully", exams)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch exams");
    }
}

export const updateExam = async (req, res) => {
    const { qid, total_marks } = req.body;
    const iid = req.params.id;
    try {
        const exam = await updateExamService(qid, total_marks, iid);
        if (!exam || exam.length === 0) return handleResponse(res, 404, "Exam not found");
        handleResponse(res, 200, "Exam updated sucessfully", exam)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to update exam");
    }
}

export const deleteExam = async (req, res) => {
    try {
        const exam = await deleteExamService(req.params.id);
        if (!exam) return handleResponse(res, 404, "Exam not found");
        handleResponse(res, 200, "Exam deleted sucessfully", exam)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to delete exam");
    }
}

export const createResult = async (req, res) => {
    const { eid, sid, iid, final_marks, total_marks } = req.body;
    try {
        const result = await createResultService(eid, sid, iid, final_marks, total_marks);
        handleResponse(res, 200, "Result created sucessfully", result);
    }
    catch (err) {
        handleResponse(res, 500, "Failed to create result ");
    }
}

export const getResultByInstructorId = async (req, res) => {
    const { iid } = req.body;
    const eid = req.params.id;
    try {
        const results = await getResultByIdService(eid, iid);
        if (!results || results.length === 0) return handleResponse(res, 404, "Results not found");
        handleResponse(res, 200, "Results fetched", results)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch results ");
    }
}

export const getResultByStudentId = async (req, res) => {
    const { sid } = req.body;
    const eid = req.params.id;
    try {
        const results = await getResultByIdService(eid, sid);
        if (!results || results.length === 0) return handleResponse(res, 404, "Results not found");
        handleResponse(res, 200, "Results fetched", results)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch results ");
    }
}

export const deleteResult = async (req, res) => {
    id = req.params.id;
    try {
        const result = await deleteResultService(id);
        if (!result) return handleResponse(res, 404, "Results not found");
        handleResponse(res, 200, "Result delete", result)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to delete result ");
    }
}