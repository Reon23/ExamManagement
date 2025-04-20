import React, { useContext } from 'react'
import SidePanel from './Instructor/SidePanel'
import { ServerContext } from '../../context/ServerContext'
import Home from './Instructor/Home';
import QuestionBank from './Instructor/QuestionBank';
import Exam from './Instructor/Exam';
import { Route, Routes } from 'react-router-dom';


const Instructor = () => {
    const { dashMode } = useContext(ServerContext);
    
    return (
        <div>
            <div className='flex'>
                <Routes>
                    <Route path='' element={<Home />}/>
                    <Route path='question_bank/*' element={<QuestionBank />} />
                    <Route path='exam/*' element={<Exam />} />
                </Routes>
                <SidePanel />
            </div>
        </div>
    )
}

export default Instructor