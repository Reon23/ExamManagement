import { 
    addQuestionService, 
    createQuestionBankService, 
    deleteQuestionBankService, 
    deleteQuestionService, 
    getAllQuestionBanksService, 
    getQuestionBankByIdService, 
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
        if (!question_bank) return handleResponse(res, 404, "Question Bank not found");
        handleResponse(res, 200, "Question Bank removed sucessfully", question_bank)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to remove question bank")
    }
}

export const getQuestionBankById = async (req, res) => {
    try {
        const question_banks = await getQuestionBankByIdService(req.body.owner_id)
        if (!question_banks) return handleResponse(res, 404, "Question Banks not found");
        handleResponse(res, 200, "Question Banks fetched sucessfully", question)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to fetch question banks")
    }
}

export const addQuestion = async (req, res) => {
    const { question, option1, option2, option3, answer, marks } = req.body;
    questionBankId = req.params.id;

    try {
        const question_result = await addQuestionService( questionBankId, question_no, question, option1, option2, option3, answer, marks );
        handleResponse(res, 200, "Question added sucessfully", question_result)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to add question")
    }
}

export const updateQuestion = async (req, res) => {
    const { question_no, question, option1, option2, option3, answer, marks } = req.body;
    questionBankId = req.params.id;

    try {
        const question_result = await updateQuestionService( questionBankId, question_no, question, option1, option2, option3, answer, marks );
        handleResponse(res, 200, "Question updated sucessfully", question_result)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to update question")
    }
}

export const deleteQuestion = async (req, res) => {
    const { question_no } = req.body;
    try {
        const question = await deleteQuestionService( req.params.id, question_no)
        if (!question) return handleResponse(res, 404, "Question not found");
        handleResponse(res, 200, "Question removed sucessfully", question)
    }
    catch (err) {
        handleResponse(res, 500, "Failed to remove question")
    }
}