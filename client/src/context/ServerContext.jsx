import React, { createContext, useState } from "react";

import axios from "axios";

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [role, setRole] = useState("instructor");
    const [buffer, setBuffer] = useState("");
    const [ fetchedQuestions, setFetchedQuestions ] = useState([]);
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

    // Add Question
    const addQuestionToDatabase = async (qbid, qid, question, option1, option2, option3, option4, answer, marks) => {
        const question_json = {
            questionBankId: qbid,
            question_id: qid,
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            marks: marks,
        }
        axios.post('http://localhost:5001/api/question', question_json)
        .then(res => {
            console.log(res.data);
            fetchQuestionsFromDatabase(qbid);
        })
        .catch(err => {
            console.error(err);
        })
    }
    
    const updateQuestionOnDatabase = async (qbid, qid, question, option1, option2, option3, option4, answer, marks) => {
        const question_json = {
            questionBankId: qbid,
            question_id: qid,
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            marks: marks,
        }
        axios.put('http://localhost:5001/api/question', question_json)
        .then(res => {
            console.log(res.data);
            fetchQuestionsFromDatabase(qbid);
        })
        .catch(err => {
            console.error(err);
        })
    }

    const deleteQuestionOnDatabase = async (qbid, qid) => {
        const question_json = {
            questionBankId: qbid,
            question_id: qid
        }
        axios.delete('http://localhost:5001/api/question', {
            data: question_json
        })
            .then(res => {
                console.log(res.data);
                fetchQuestionsFromDatabase(qbid);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const fetchQuestionsFromDatabase = async (qbid) => {
        setFetchedQuestions([]);
        axios.get(`http://localhost:5001/api/question/${qbid}`)
            .then(res => {
                console.log(res.data);
                const data = res.data.data;
                structureQuestionData(data);
            })
            .catch(err => {
                console.error(err);
            })
    }


    const structureQuestionData = (data) => {
        const structuredData = [];
        for (let i = 0; i < data.length; i++) {
            structuredData.push({
                id: data[i].qid,
                question: data[i].question,
                options: [data[i].option1, data[i].option2, data[i].option3, data[i].option4],
                answer: data[i].answer,
                marks: data[i].marks
            });
        }
        console.log(structuredData);
        setFetchedQuestions(structuredData);
    }

    return (
        <ServerContext.Provider value={
            {
                account,
                loginFailed,
                questionBanks,
                banksAvail,
                role,
                buffer,
                fetchedQuestions,
                updateQuestionOnDatabase,
                deleteQuestionOnDatabase,
                setFetchedQuestions,
                fetchQuestionsFromDatabase,
                addQuestionToDatabase,
                setBuffer,
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