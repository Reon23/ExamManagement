import React, { createContext, useState } from "react";

import axios from "axios";

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [role, setRole] = useState("instructor");
    const [questionBanks, setQuestionBanks] = useState([]);
    const [banksAvail, setBanksAvail] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    // Register methods
    const registerInstructor = async (role, name, email, password) => {
        instructor = {
            role: role,
            name: name,
            email: email,
            password: password
        }
        axios.post('http://localhost:5001/api/auth/register', instructor)
        .then(res => {
            console.log(res.data);
            setAccount(res.data);
        })
        .catch(err => {
            console.error(err)
        });
    }

    const registerStudent = async (role, firstName, lastName, email, password) => {
        student = {
            role: role,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }
        axios.post('http://localhost:5001/api/auth/register', student)
        .then(res => {
            console.log(res.data);
            setAccount(res.data);
        })
        .catch(err => console.error(err));
    }

    // Login method
    const loginUser = async (role, email, password) => {
        const user = {
            role: role,
            email: email,
            password: password
        }
        setLoginFailed(false);
        axios.post('http://localhost:5001/api/auth/login', user)
        .then(res => {
            console.log(res.data.user);
            setAccount(res.data.user);
        })
        .catch(err => {
            console.error(err);
            setLoginFailed(true);
        });
    }

    // Question Bank Methods
    // Fetch Instructor Question Banks
    const fetchInstructorBanks = async () => {
        setBanksAvail(false);
        axios.get(`http://localhost:5001/api/question_bank/${account.id}`)
        .then(res => {
            console.log(res.data);
            setQuestionBanks(res.data.data)
            setBanksAvail(true);
        })
        .catch(err => {
            console.error(err);
        });
    }

    // Create Question Bank
    const createQuestionBank = async (subject) => {
        const question_bank = {
            subject: subject,
            owner_id: account.id
        }
        axios.post('http://localhost:5001/api/question_bank', question_bank)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <ServerContext.Provider value={
            {
                account,
                loginFailed,
                questionBanks,
                banksAvail,
                role,
                createQuestionBank,
                setRole,
                setBanksAvail,
                setQuestionBanks,
                setAccount,
                registerInstructor,
                registerStudent,
                loginUser,
                fetchInstructorBanks,
            }}>
            {children}
        </ServerContext.Provider>
    )
}