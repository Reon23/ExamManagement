import express from "express";
import { 
    addQuestion, 
    createQuestionBank, 
    deleteQuestion, 
    deleteQuestionBank, 
    fetchQuestions, 
    getQuestionBankById, 
    getQuestionBankDetails, 
    getQuestionBanks, 
    searchQuestionBank, 
    updateQuestion 
} from "../controller/questionController.js";

const router = express.Router();

// Question bank routes
router.post('/question_bank', createQuestionBank)
router.get('/question_bank', getQuestionBanks)
router.get('/question_bank_search', searchQuestionBank)
router.delete('/question_bank/:id', deleteQuestionBank)
router.get('/question_bank/:id', getQuestionBankById)
router.get('/question_bank_details/:id', getQuestionBankDetails)

// Question routes
router.post('/question', addQuestion)
router.put('/question', updateQuestion)
router.get('/question/:id', fetchQuestions)
router.delete('/question', deleteQuestion)

export default router;