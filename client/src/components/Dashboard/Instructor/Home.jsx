import React, { useContext, useState } from 'react'
import { ServerContext } from '../../../context/ServerContext'
import QuestionBankImg from '../../../images/questionbank.png'
import ExamImg from '../../../images/Exam.png'

const Card = ({ title, caption, img, redirect }) => {
    const { setDashMode } = useContext(ServerContext);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const showDetails = () => {
        if (!detailsVisible) setDetailsVisible(true);
    }

    const hideDetails = () => {
        if (detailsVisible) setDetailsVisible(false);
    }

    const handleRedirect = () => {
        setDashMode(redirect)
    }

    return (
        <div className='bg-gray-700 relative w-[40rem] h-[25rem] rounded-md overflow-hidden shadow-2xl cursor-pointer' onClick={handleRedirect} onMouseEnter={showDetails} onMouseLeave={hideDetails}>
            <img src={img} className='-mt-12 transition ease-in-out hover:scale-110'/>
            <div key={detailsVisible} className={`absolute bottom-0 w-full bg-white opacity-90 rounded-b-md pointer-events-none ${detailsVisible ? "pop-up-normal": "pop-up-reverse"}`}>
                <div className={`w-6/10 ${detailsVisible && "scale-up-center-normal"}`}>
                    <h1 className='text-2xl font-bold pl-8 pt-5 pb-2'>{title || "title"}</h1>
                    <hr className='w-10/12 ml-8 border-gray-300 border-[1px]'/>
                    <h2 className='ml-8 pt-2 pb-10 text-xl'>{caption || "caption"}</h2>
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    const { account } = useContext(ServerContext);
    return (
        <div className='fixed left-[5.5rem] w-full h-screen bg-gray-800'>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Welcome <span>{account.name || "User"}</span></h1>
            <div className='flex flex-row gap-4 w-full mx-10'>
                <Card title={"Question Banks"} caption={"Create and manage question banks"} img={QuestionBankImg} redirect={"question"}/>
                <Card title={"Exams"} caption={"Create and manage exams"} img={ExamImg} redirect={"exam"}/>
            </div>
        </div>
    )
}

export default Home