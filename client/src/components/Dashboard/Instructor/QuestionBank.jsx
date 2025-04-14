import React, { useContext, useState } from 'react'
import CreateBank from '../../../images/createbank.jpg';
import ManageBank from '../../../images/managebank.jpg';

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

const QuestionBank = () => {
    return (
        <div className='fixed left-[5.5rem] w-full h-screen bg-gray-800'>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Question Banks</h1>
            <div className='flex flex-row gap-4 w-full mx-10'>
                <Card title={"Create Question Bank"} img={CreateBank}/>
                <Card title={"Manage Question Banks"} img={ManageBank}/>
            </div>
            <h1 className='text-3xl font-bold p-10 text-gray-300'>Recent Banks</h1>
        </div>
    )
}

export default QuestionBank