import express from "express"
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from "../controller/userController.js";
import validateUser from "../middleware/inputValidator.js";

const router = express.Router();
//Manage all user routes/endpoints

router.post("/user", validateUser, createUser);
router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);

export default router;