import express from "express";
import { 
    addQuestion, 
    createQuestionBank, 
    deleteQuestion, 
    deleteQuestionBank, 
    getQuestionBankById, 
    getQuestionBanks, 
    updateQuestion 
} from "../controller/questionController.js";

const router = express.Router();

// Question bank routes
router.post('/question_bank', createQuestionBank)
router.get('/question_bank', getQuestionBanks)
router.delete('/question_bank/:id', deleteQuestionBank)
router.get('/question_bank/:id', getQuestionBankById)

// Question routes
router.post('/question', addQuestion)
router.put('/question', updateQuestion)
router.delete('/question', deleteQuestion)

export default router;