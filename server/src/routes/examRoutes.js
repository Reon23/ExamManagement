import express from "express";
import { 
    createExam, 
    createResult, 
    deleteExam, 
    deleteResult, 
    getAllExams, 
    getExamById, 
    getResultByInstructorId, 
    getResultByStudentId, 
    updateExam 
} from "../controller/examController.js";

const router = express.Router();

// Exam routes
router.post('/exam', createExam)
router.get('/exam', getAllExams)
router.get('/exam/:id', getExamById)
router.put('/exam/:id', updateExam)
router.delete('/exam/:id', deleteExam)

// Result routes
router.post('/result', createResult)
router.get('/result/:id', getResultByInstructorId)
router.get('/result/:id', getResultByStudentId)
router.delete('/result/:id', deleteResult)

export default router;