import express from "express";

const router = express.Router();

router.post('/question_bank', createQuestionBank)
router.get('/question_bank', getQuestionBanks)
router.delete('/question_bank/:id', deleteQuestionBank)
router.get('/question_bank/:id', getQuestionBankById)
router.post('/question', addQuestion)
router.put('/question/:id', updateQuestion)
router.delete('/question/:id', deleteQuestion)