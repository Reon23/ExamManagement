import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { handleNavigation } from './utils/Navigation';
import { ServerContext } from '../../../context/ServerContext';
import CreateExam from '../../../images/createexam.png';
import ManageExam from '../../../images/manageexam.png';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';

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

const CreatePage = () => {
    const { banksAvail, questionBanks, fetchInstructorBanks, fetchAllBanks, searchForBanks } = useContext(ServerContext);
    const [title, setTitle] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [type, setType] = useState("own");
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstructorBanks();
    }, [])

    useEffect(() => {
        if(searchQuery)
        {
            setType("all");
            searchForBanks(searchQuery);
        }
        else {
            if(type === "own")
                fetchInstructorBanks();
            else
                fetchAllBanks();
        }

    }, [searchQuery, type])

    return(
        <div className='fixed left-[5.5rem] w-full h-screen bg-gray-800'>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Create</h1>
            <div className='w-full px-10'>
                <div className='w-[91vw] h-[85vh] bg-gray-900 p-5 rounded-md shadow-2xl scale-up-center-normal flex gap-4'>
                    <div className='w-full flex flex-col h-full'>
                        <div className='flex items-center justify-between my-2'>
                            <h1 className='text-3xl font-bold text-gray-400 mb-4'>Exam Details</h1>
                            <div className='flex gap-2 mr-5'>
                                <button className='text-gray-300 hover:text-white border-gray-300 hover:border-white border-[1px] p-2 rounded-md cursor-pointer' onClick={() => handleNavigation(navigate, "exam")}>
                                    Back
                                </button>
                                <button className='text-green-600 hover:text-green-700 bg-border-600 hover:border-green-700 border-[1px] p-2 rounded-md cursor-pointer'>
                                    create
                                </button>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 grid-rows-2 gap-2 w-1/2'>
                            <label className='text-gray-300 text-xl'>
                                Title :
                                <input name='name' type='text' className='bg-gray-800 p-2 ml-20 text-white rounded-lg' onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label className='text-gray-300 text-xl block'>
                                Bank Name :
                                <input name='name' type='text' className='bg-gray-800 p-2 ml-4 text-white rounded-lg' disabled />
                            </label>
                            <label className='text-gray-300 text-xl block'>
                                Total Marks :
                                <input name='name' type='text' className='bg-gray-800 p-2 ml-4 text-white rounded-lg' disabled />
                            </label>
                            <label className='text-gray-300 text-xl block'>
                                Questions :
                                <input name='name' type='text' className='bg-gray-800 p-2 ml-7 text-white rounded-lg' disabled />
                            </label>
                        </div>
                        <h1 className='text-3xl font-bold text-gray-400 mt-10 mb-4'>Question Bank</h1>
                        <div className='w-12/12 bg-slate-950 flex-grow flex-col rounded-lg overflow-hidden'>
                            <span className='text-white bg-slate-950 flex gap-4 items-center p-4'>
                                <div className='flex items-center gap-1 border-gray-400 border-[1px] p-1 w-2/10 rounded-lg'>
                                    <SearchIcon sx={{ fontSize: 35 }} />
                                    <input name='search' type='text' placeholder='search' className='text-xl w-full outline-none' onChange={(e) => setSearchQuery(e.target.value)}/>
                                </div>
                                <div className='flex gap-2 select-none'>
                                    <label className={`${type === "own" ? "border-white" : "border-gray-400"} border-[1px] py-2 px-4 rounded-lg cursor-pointer`}>
                                        <input name='type' type='radio' checked={type === "own"} value={'own'} className='hidden peer' onChange={() => {setType("own"); setSearchQuery("")}} />
                                        <span className={`text-lg ${type === "own" ? "text-white" : "text-gray-400"} hover:text-white`}>own</span>
                                    </label>
                                    <label className={`${type === "all" ? "border-white" : "border-gray-400"} border-[1px] py-2 px-4 rounded-lg cursor-pointer`}>
                                        <input name='type' type='radio' checked={type === "all"} value={'all'} className='hidden peer' onChange={() => {setType("all"); setSearchQuery("")}} />
                                        <span className={`text-lg ${type === "all" ? "text-white" : "text-gray-400"} hover:text-white`}>all</span>
                                    </label>
                                </div>
                            </span>
                            <div className='overflow-y-auto h-full'>
                                {questionBanks.length !== 0 ? (
                                    <div className='h-full'>
                                        {questionBanks.map((item, index) => (
                                            <div key={index} className='flex flex-col'>
                                                <div className='bg-gray-800 flex flex-grow justify-between items-center mx-5 my-1 p-5 rounded-md scale-up-center-normal'>
                                                    <div className='flex gap-2 items-center'>
                                                        <ArticleIcon fontSize='large' color='primary' />
                                                        <h1 className='text-white text-xl'>{item.subject}</h1>
                                                    </div>
                                                    <div className='flex gap-2 mr-2'>
                                                        <button className='bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer'>
                                                            <VisibilityIcon fontSize='medium' sx={{ color: 'white' }} />
                                                        </button>
                                                        <button className='bg-gray-500 hover:bg-gray-600 p-2 rounded-md cursor-pointer'>
                                                            <CheckIcon fontSize='medium' sx={{ color: 'white' }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='mx-5 my-2'>
                                        <span className='text-gray-600'>*Cannot fetch banks</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExamPage = () => {
    const navigate = useNavigate();

    return (
        <div className='fixed left-[5.5rem] w-full h-screen bg-gray-800'>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Exams</h1>
            <div className='flex flex-row gap-4 w-full mx-10'>
                <div onClick={() => handleNavigation(navigate, "exam/create")}>
                    <Card title={"Create Exam"} img={CreateExam} />
                </div>
                <Card title={"Manage Exams"} img={ManageExam} />
            </div>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Recent Exams</h1>
        </div>
    )
}

const Exam = () => {
    return (
        <Routes>
            <Route path="" element={<ExamPage />} />
            <Route path="create" element={<CreatePage />} />
        </Routes>
    )
}

export default Exam