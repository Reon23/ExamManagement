import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ServerContext } from '../../../context/ServerContext';
import CreateBank from '../../../images/createbank.jpg';
import ManageBank from '../../../images/managebank.jpg';
import EmptyBox from '../../../images/box.png'
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { handleNavigation } from './utils/Navigation';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { stripPunctuation } from '../../../utils/cleanText';
import { formatDate } from '../../../utils/dateFormat';

const Card = ({ title, img}) => {

    return (
        <div className='bg-gray-700 relative w-[30vw] h-[25rem] rounded-md overflow-hidden shadow-2xl cursor-pointer scale-up-center-normal'>
            <img src={img} className='transition object-fill ease-in-out scale-110 hover:scale-125'/>
            <div className={`absolute bottom-0 w-full bg-white rounded-b-md pointer-events-none pop-up-normal`}>
                <div className={`w-6/10`}>
                    <h1 className='text-2xl font-bold pl-8 py-5'>{title || "title"}</h1>
                </div>
            </div>
        </div>
    )
}

const CreatePanel = () => {
    const { createQuestionBank } = useContext(ServerContext);
    const [bankName, setBankName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const cleanText = stripPunctuation(bankName)

        if(!cleanText) {
            console.log("No bank name");
            return;
        }
        createQuestionBank(cleanText);
    }

    return (
        <div>
            <div className='fixed left-0 top-0 w-screen h-screen bg-black opacity-50'/>
            <div className='absolute z-50 w-screen h-screen top-0 left-0 scale-up-center-normal'>
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <div className=' w-3/10 mx-auto relative my-10 bg-gray-900 rounded-lg flex flex-col items-center'>
                        <div className='absolute left-5 top-5 cursor-pointer' onClick={() => handleNavigation(navigate, "question_bank/")}>
                            <CloseIcon sx={{ color: 'white'}} fontSize='large' />
                        </div>
                        <h1 className='text-3xl font-bold text-center pt-12 text-white'>Create Question Bank</h1>
                        <input name='subject' type='text' placeholder='Subject' className='w-8/10 outline-none border-gray-800 bg-gray-300 border-2 p-2 my-5 rounded-md text-xl text-black' onChange={(e) => setBankName(e.target.value)}/>
                        <button className='p-2 mt-2 mb-5 bg-green-500 hover:bg-green-700 text-white rounded-md cursor-pointer' onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EditPage = () => {
    const { buffer, addQuestionToDatabase, fetchQuestionsFromDatabase, fetchedQuestions, setFetchedQuestions, updateQuestionOnDatabase, deleteQuestionOnDatabase } = useContext(ServerContext);
    const [ questions, setQuestions ] = useState([]);
    const [ totalMarks, setTotalMarks ] = useState(0);
    const [updateQuestions, setUpdateQuestions] = useState([]);

    useEffect(() => {
        fetchQuestionsFromDatabase(buffer.id);
    }, [])

    useEffect(() => {
        if (fetchedQuestions.length || questions.length) {
            fetchTotalMarks();
        }
        else {
            setTotalMarks(0);
        }
    }, [fetchedQuestions, questions])

    const handleQuestionChange = (questions, questionIndex, newValue, update = false) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].question = newValue;
        if (!update)
            setQuestions(updatedQuestions);
        else {
            setFetchedQuestions(updatedQuestions);
            appendQuestionForUpdate(updatedQuestions[questionIndex].id);
        }
    };

    const handleOptionChange = (questions, questionIndex, optionIndex, newValue, update = false) => {
        const updatedQuestions = [...questions];

        // Check if this option is currently the selected answer BEFORE updating
        const isAnswer = updatedQuestions[questionIndex].answer === updatedQuestions[questionIndex].options[optionIndex];

        // Now update the option
        updatedQuestions[questionIndex].options[optionIndex] = newValue;

        // If this was the selected answer, update the answer to the new value too
        if (isAnswer) {
            updatedQuestions[questionIndex].answer = newValue;
        }

        if (!update)
            setQuestions(updatedQuestions);
        else {
            setFetchedQuestions(updatedQuestions);
            appendQuestionForUpdate(updatedQuestions[questionIndex].id);
        }
    };

    const handleAnswerSelect = (questions, questionIndex, newValue, update = false) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answer = newValue;
        if (!update)
            setQuestions(updatedQuestions);
        else {
            setFetchedQuestions(updatedQuestions);
            appendQuestionForUpdate(updatedQuestions[questionIndex].id);
        }
    };

    const handleMarksChange = (questions, questionIndex, newValue, update = false) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].marks = newValue;
        if (!update)
            setQuestions(updatedQuestions);
        else {
            setFetchedQuestions(updatedQuestions);
            appendQuestionForUpdate(updatedQuestions[questionIndex].id);
        }
        fetchTotalMarks();
    }

    const addQuestion = () => {
        setQuestions([...questions, { id: uuidv4(), question: '', options: ['', '', '', ''], answer: '', marks: 0 }]);
    }

    const removeQuestion = (id) => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
    }

    const deleteQuestion = (qid) => {
        console.log(buffer.id, qid);
        if (buffer.id && qid)
            deleteQuestionOnDatabase(buffer.id, qid);
    }

    const appendQuestionForUpdate = (id) => {
        if (updateQuestions.includes(id)) {
            return;
        };
        setUpdateQuestions([...updateQuestions, id]);
    }

    const handleSubmit = async (questions, update = false) => {
        if (questions.length > 0)
            for (let i = 0; i < questions.length; i++) {
                // if(update && !updateQuestions.includes(questions[i].id)){
                //     console.log("List contains : ", updateQuestions);
                //     console.log("Loop broken for id : ", questions[i].id);
                //     break;
                // }
                let qid, question, option1, option2, option3, option4, answer, marks;
                qid = questions[i].id;
                question = questions[i].question;
                answer = questions[i].answer;
                marks = Number(questions[i].marks);
                for (let j = 0; j < questions[i].options.length; j++) {
                    switch (j) {
                        case 0:
                            option1 = questions[i].options[j];
                            break;
                        case 1:
                            option2 = questions[i].options[j];
                            break;
                        case 2:
                            option3 = questions[i].options[j];
                            break;
                        case 3:
                            option4 = questions[i].options[j];
                            break;
                    }
                }
                // console.log(qid);
                // console.log(question);
                // console.log(answer);
                // console.log(marks);
                // console.log("options : ", option1, option2, option3, option4);
                if (qid && question && option1 && option2 && option3 && option4 && answer && marks) {
                    if (!update) {
                        addQuestionToDatabase(buffer.id, qid, question, option1, option2, option3, option4, answer, marks);
                        setQuestions([]);
                    }
                    else {
                        updateQuestionOnDatabase(buffer.id, qid, question, option1, option2, option3, option4, answer, marks);
                    }
                }
                else console.error("Details missing");
            }
        else console.log("No questions :(");
        setUpdateQuestions([]);
    }

    const fetchTotalMarks = () => {
        setTotalMarks(0);
        let marks = 0;
        for (let i = 0; i < fetchedQuestions.length; i++)
            marks += Number(fetchedQuestions[i].marks);
        for (let i = 0; i < questions.length; i++)
            marks += Number(questions[i].marks);

        setTotalMarks(marks);
    }

    return (
        <div className='fixed left-0 w-full h-screen bg-gray-800 overflow-y-auto overflow-x-hidden'>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Edit Question Bank</h1>
            <div className='w-full pl-28 flex gap-5'>
                <div className='w-3/5 bg-gray-900 rounded-md p-4 relative shadow-2xl scale-up-center-normal'>
                    <h1 className='text-3xl font-bold text-gray-400 mb-4'>Questions</h1>
                    <div className='mb-14 overflow-y-auto h-[70vh]'>
                        {fetchedQuestions.length > 0 && (
                            <>
                                {fetchedQuestions.map((question, index) => (
                                    <div key={question.id} className='mt-4'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <span className='text-xl text-white mr-2'>{index + 1}.</span>
                                                <input name='question' type='text' placeholder='Enter question' defaultValue={question.question} className='text-xl text-white' required onChange={(e) => handleQuestionChange(fetchedQuestions, index, e.target.value, true)} />
                                            </div>
                                            <div>
                                                <span className='text-xl text-gray-300 mr-2'>marks :</span>
                                                <input name='marks' type='number' defaultValue={question.marks} className='text-xl text-white w-20 mr-6 text-right' required onChange={(e) => handleMarksChange(fetchedQuestions, index, e.target.value, true)} />
                                            </div>
                                        </div>
                                        <div className='grid grid-rows-2 grid-cols-2 gap-2 ml-5 mr-5 mt-4'>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className={`p-2 border-2 ${question.answer === option && question.answer ? "border-green-500" : "border-gray-500"} rounded-md cursor-pointer`} onClick={() => handleAnswerSelect(fetchedQuestions, index, option)}>
                                                    <input name={'option' + optionIndex} type='text' placeholder={'option ' + (optionIndex + 1)} defaultValue={option} className='outline-none text-xl text-white' required onChange={(e) => handleOptionChange(fetchedQuestions, index, optionIndex, e.target.value, true)} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-end mr-5'>
                                            <button className='text-red-600 hover:text-red-700 cursor-pointer underline text-base py-2' onClick={() => deleteQuestion(question.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {questions.length > 0 && (
                            <>
                                {questions.map((question, index) => (
                                    <div key={question.id} className='mt-4'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <span className='text-xl text-white mr-2'>{(fetchedQuestions.length) + index + 1}.</span>
                                                <input name='question' type='text' placeholder='Enter question' className='text-xl text-white' required onChange={(e) => handleQuestionChange(questions, index, e.target.value)} />
                                            </div>
                                            <div>
                                                <span className='text-xl text-gray-300 mr-2'>marks :</span>
                                                <input name='marks' type='number' className='text-xl text-white w-20 mr-6 text-right' required onChange={(e) => handleMarksChange(questions, index, e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='grid grid-rows-2 grid-cols-2 gap-2 ml-5 mr-5 mt-4'>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className={`p-2 border-2 ${question.answer === option && question.answer ? "border-green-500" : "border-gray-500"} rounded-md cursor-pointer`} onClick={() => handleAnswerSelect(questions, index, option)}>
                                                    <input name={'option' + optionIndex} type='text' placeholder={'option ' + (optionIndex + 1)} className='outline-none text-xl text-white' required onChange={(e) => handleOptionChange(questions, index, optionIndex, e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-end mr-5'>
                                            <button className='text-red-600 hover:text-red-700 cursor-pointer underline text-base py-2' onClick={() => removeQuestion(question.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {!fetchedQuestions.length > 0 && !questions.length > 0 && (
                            <h2 className='text-gray-500 mt-2'>*Your bank currently has no questions</h2>
                        )}
                    </div>
                    <div className='absolute bottom-5 mt-5 flex gap-2'>
                        <button className='text-white text-xl p-2 bg-green-500 hover:bg-green-600 cursor-pointer rounded-lg flex items-center' onClick={() => addQuestion()}>
                            <AddIcon fontSize='medium' />
                            Add
                        </button>
                        <button className='text-white text-xl p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg flex items-center' onClick={() => { handleSubmit(questions); handleSubmit(fetchedQuestions, true) }}>
                            <SaveIcon fontSize='medium' />
                            Save
                        </button>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col items-center bg-gray-700 rounded-md mr-5 shadow-2xl scale-up-center-normal'>
                    <ArticleIcon sx={{ fontSize: 150 }} color='primary' className='mt-10' />
                    <h1 className='text-white font-bold text-3xl flex-wrap w-1/4 text-center'>{buffer.subject}</h1>
                    <hr className='border-gray-600 border-[0.5] w-10/12 my-5' />
                    <div className='w-10/12'>
                        <h1 className='text-white text-lg'>Questions : {fetchedQuestions.length + questions.length}</h1>
                        <h1 className='text-white text-lg'>Total Marks : {totalMarks}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DeletePrompt = () => {
    const { buffer, deleteQuestionBank } = useContext(ServerContext);
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteQuestionBank(buffer.id);
        handleNavigation(navigate, "question_bank/");
    }

    return (
        <div>
            <div className='fixed left-0 top-0 w-screen h-screen bg-black opacity-50'/>
            <div className='absolute z-50 w-screen h-screen top-0 left-0 scale-up-center-normal'>
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <div className=' w-3/10 mx-auto relative my-10 bg-gray-900 rounded-lg flex flex-col items-center'>
                        <h1 className='text-3xl font-bold text-center pt-12 text-white'>Delete {buffer.subject} ?</h1>
                        <div className='flex gap-2 w-8/10 mt-5 justify-end'>
                        <button className='p-2 mt-2 mb-5 border-gray-300 hover:border-white border-1 text-white rounded-md cursor-pointer' onClick={() => handleNavigation(navigate, "question_bank/")}>Cancel</button>
                        <button className='p-2 mt-2 mb-5 bg-red-500 hover:bg-red-700 text-white rounded-md cursor-pointer' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const QuestionBankPage = () => {
    const { setBuffer, banksAvail, questionBanks, fetchInstructorBanks} = useContext(ServerContext);
    const [ recentBanks , setRecentBanks ] = useState([]);
    const recentCount = 5;
    const navigate = useNavigate();

    const handleClick = (id, subject) => {
        const data = {
            id: id,
            subject: subject,
        }
        setBuffer(data);
        handleNavigation(navigate, "question_bank/edit")
    }

    const handleDelete = (id, subject) => {
        const data = {
            id: id,
            subject: subject
        }
        setBuffer(data);
        handleNavigation(navigate, "question_bank/delete")
    }

    useEffect(() => {
        fetchInstructorBanks();
    }, []);

    useEffect(() => {
        if (banksAvail){
            setRecentBanks(questionBanks.slice(0, recentCount));
            console.log(recentBanks);
        }
    }, [banksAvail]);

    return (
        <div className='fixed left-0 w-full h-screen bg-gray-800 overflow-y-auto overflow-x-hidden'>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Question Banks</h1>
            <div className='flex flex-row gap-4 w-full mx-10 ml-[8rem]'>
                <div onClick={() => handleNavigation(navigate, "question_bank/create")}>
                    <Card title={"Create Question Bank"} img={CreateBank} />
                </div>
                <Card title={"Manage Question Banks"} img={ManageBank} />
            </div>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Recent Banks</h1>
            {banksAvail ? (
                <>
                    <div className='bg-gray-900 ml-[8rem] mr-[2rem] h-[40vh] mb-5 px-4 py-2 rounded-md shadow-lg overflow-y-auto'>
                        {recentBanks.map((item, key) => (
                            <div key={key}>
                                <div className='bg-gray-700 p-3 mt-2 rounded-lg flex justify-between items-center shadow-xl scale-up-center-normal'>
                                    <div className='flex items-center'>
                                        <ArticleIcon fontSize='large' color='primary' />
                                        <span className='text-2xl text-white ml-2'>{item.subject}</span>
                                    </div>
                                    <div className='flex items-center self-center'>
                                        <span className='text-xl text-gray-300 mr-10'>{formatDate(item.created_at)}</span>
                                        <button className='bg-green-500 hover:bg-green-600 p-2 rounded-lg cursor-pointer mr-2' onClick={() => handleClick(item.id, item.subject)}>
                                            <EditIcon fontSize='medium' sx={{ color: 'white' }} />
                                        </button>
                                        <button className='bg-red-500 hover:bg-red-600 p-2 rounded-lg cursor-pointer mr-2' onClick={() => handleDelete(item.id, item.subject)}>
                                            <DeleteIcon fontSize='medium' sx={{ color: 'white' }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='bg-gray-900 ml-[8rem] mr-[2rem] rounded-md'>
                    <div className='flex flex-col p-5 w-full justify-center items-center'>
                        <img src={EmptyBox} className='w-[10rem] opacity-45 grayscale' />
                        <span className='text-xl text-gray-400 w-1/10 text-center'>Recent banks will appear here!</span>
                    </div>
                </div>
            )}
        </div>
    )
}

const QuestionBank = () => {
    return (
        <Routes>
            <Route path="" element={<QuestionBankPage />} />
            <Route path="create" element={
                <>
                    <QuestionBankPage />
                    <CreatePanel />
                </>
            } />
            <Route path="delete" element={
                <>
                    <QuestionBankPage />
                    <DeletePrompt />
                </>
            } />
            <Route path="edit" element={<EditPage />} />
        </Routes>
    )
}

export default QuestionBank