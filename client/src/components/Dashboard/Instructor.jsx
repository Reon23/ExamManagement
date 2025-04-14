import React, { useContext } from 'react'
import SidePanel from './Instructor/SidePanel'
import { ServerContext } from '../../context/ServerContext'
import Home from './Instructor/Home';
import QuestionBank from './Instructor/QuestionBank';
import Exam from './Instructor/Exam';


const Instructor = () => {
    const { dashMode } = useContext(ServerContext);
    
    return (
        <div>
            <div className='flex'>
                {dashMode === "home" && (
                    <Home />
                )}
                {dashMode === "question" && (
                    <QuestionBank />
                )}
                {dashMode === "exam" && (
                    <Exam />
                )}
                <SidePanel />
            </div>
        </div>
    )
}

export default Instructor