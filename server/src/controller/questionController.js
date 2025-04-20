import { 
    addQuestionService, 
    createQuestionBankService, 
    deleteQuestionBankService, 
    deleteQuestionService, 
    fetchQuestionsService, 
    getAllQuestionBanksService, 
    getQuestionBankByIdService, 
    getQuestionCount, 
    getTotalMarks, 
    searchQuestionBankService, 
    updateQuestionService
} from "../models/questionModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const createQuestionBank = async (req, res) => {
    const { subject, owner_id } = req.body;

    try {
        const question_bank = await createQuestionBankService(subject, owner_id);
        handleResponse(res, 200, "Question Bank created sucessfully", question_bank)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to create question bank")
    }
}

export const getQuestionBanks = async (req, res) => {

    try {
        const question_banks = await getAllQuestionBanksService();
        if (!question_banks || question_banks.length === 0) return handleResponse(res, 404, "Question Banks not found");
        handleResponse(res, 200, "Question Banks fetched sucessfully", question_banks)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch question banks")
    }
}

export const deleteQuestionBank = async (req, res) => {
    const { owner_id } = req.body;
    try {
        const question_bank = await deleteQuestionBankService(req.params.id, owner_id)
        if (!question_bank || question_bank.length === 0) return handleResponse(res, 404, "Question Bank not found");
        handleResponse(res, 200, "Question Bank removed sucessfully", question_bank)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to remove question bank")
    }
}

export const getQuestionBankById = async (req, res) => {
    try {
        const question_banks = await getQuestionBankByIdService(req.params.id)
        if (!question_banks || question_banks.length === 0) return handleResponse(res, 404, "Question Banks not found");
        handleResponse(res, 200, "Question Banks fetched sucessfully", question_banks)
    }
    catch (err) {
        console.error("Error fetching question bank:", err);
        handleResponse(res, 500, "Failed to fetch question banks")
    }
}

export const searchQuestionBank = async (req, res) => {
    const query = req.query.query;
    try {
        const question_banks = await searchQuestionBankService(query);
        if (!question_banks || question_banks.length === 0) return handleResponse(res, 404, "Question Banks not found");
        handleResponse(res, 200, "Question Banks fetched sucessfully", question_banks)
    }
    catch (err) {
        console.error("Error fetching question bank:", err);
        handleResponse(res, 500, "Failed to fetch question banks")
    }
}

export const getQuestionBankDetails = async (req, res) => {
    try {
        const marks = await getTotalMarks(req.params.id);
        const count = await getQuestionCount(req.params.id);
        const details = {
            total_marks : marks.total_marks,
            questions : count.questions
        }
        handleResponse(res, 200, "Details fetched", details);
    } catch (err) {
        console.error("Error fetching details", err);
        handleResponse(res, 500, "Failed to fetch details");
    }
}

export const addQuestion = async (req, res) => {
    const { questionBankId, question_id, question, option1, option2, option3, option4, answer, marks } = req.body;

    try {
        const question_result = await addQuestionService( questionBankId, question_id, question, option1, option2, option3, option4, answer, marks );
        handleResponse(res, 200, "question added sucessfully", question_result)
    }
    catch (err) {
        console.error("Error adding question:", err);
        handleResponse(res, 500, "failed to add question")
    }
}

export const fetchQuestions = async (req, res) => {
    const questionBankId = req.params.id;

    try {
        const questions_result = await fetchQuestionsService( questionBankId );
        handleResponse(res, 200, "questions fetched sucessfully", questions_result)
    }
    catch (err) {
        console.error("Error fetching questions:", err);
        handleResponse(res, 500, "failed to fetch questions")
    }
}

export const updateQuestion = async (req, res) => {
    const { questionBankId, question_id, question, option1, option2, option3, option4, answer, marks } = req.body;

    try {
        const question_result = await updateQuestionService( questionBankId, question_id, question, option1, option2, option3, option4, answer, marks );
        handleResponse(res, 200, "Question updated sucessfully", question_result)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to update question")
    }
}

export const deleteQuestion = async (req, res) => {
    const { questionBankId, question_id } = req.body;
    try {
        const question = await deleteQuestionService( questionBankId, question_id)
        if (!question || question.length === 0) return handleResponse(res, 404, "Question not found");
        handleResponse(res, 200, "Question removed sucessfully", question)
    }
    catch (err) {
        console.error("Error deleting question:", err);
        handleResponse(res, 500, "Failed to remove question")
    }
}