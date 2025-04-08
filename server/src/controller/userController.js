import { createUserService, getAllUsersService, getUsersByIdService } from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

//Handles all user operations

export const createUser = async (req, res, next) => {
    const {name, email} = req.body;
    try {
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, "User created sucessfully", newUser);
    }
    catch (err) {
        next(err);
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetched sucessfully", users);
    }
    catch (err) {
        next(err);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await getUsersByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User fetched sucessfully", user);
    }
    catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    const {name, email} = req.body();
    try {
        const updatedUser = await getUsersByIdService(req.params.id, name, email);
        if (!updateUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User updated sucessfully", updatedUser);
    }
    catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await getUsersByIdService(req.params.id);
        if (!deleteUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User deleted sucessfully", deletedUser);
    }
    catch (err) {
        next(err);
    }
}