import React, { useContext, useEffect, useState } from 'react'
import { ServerContext } from '../../../context/ServerContext';
import CreateBank from '../../../images/createbank.jpg';
import ManageBank from '../../../images/managebank.jpg';
import EmptyBox from '../../../images/box.png'
import CloseIcon from '@mui/icons-material/Close';

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
    const { setCreatingBank } = useContext(ServerContext);
    return (
        <div>
            <div className='fixed left-0 top-0 w-screen h-screen bg-black opacity-50'/>
            <div className='absolute z-50 w-screen h-screen top-0 left-0 scale-up-center-normal'>
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <div className=' w-3/10 mx-auto relative my-10 bg-gray-900 rounded-3xl flex flex-col items-center'>
                        <div className='absolute left-5 top-5 cursor-pointer' onClick={() => setCreatingBank(false)}>
                            <CloseIcon sx={{ color: 'white'}} fontSize='large' />
                        </div>
                        <h1 className='text-3xl font-bold text-center pt-12 text-white'>Create Question Bank</h1>
                        <input name='subject' type='text' placeholder='Subject' className='w-8/10 outline-none border-gray-800 bg-gray-300 border-2 p-2 my-5 rounded-md text-xl text-black'/>
                        <button className='p-2 mt-2 mb-5 bg-green-500 hover:bg-green-700 text-white rounded-md cursor-pointer'>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const QuestionBank = () => {
    const { account, banksAvail, questionBanks, fetchInstructorBanks, creatingBank, setCreatingBank } = useContext(ServerContext);
    useEffect(() => {
        console.log(account.id);
        fetchInstructorBanks(account.id);

    }, []);

    useEffect(() => {
        if (banksAvail) console.log(questionBanks);
    }, [banksAvail]);
    
    return (
        <div className='fixed left-0 w-full h-screen bg-gray-800 overflow-y-auto overflow-x-hidden'>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Question Banks</h1>
            <div className='flex flex-row gap-4 w-full mx-10 ml-[8rem]'>
                <div onClick={() => setCreatingBank(true)}>
                    <Card title={"Create Question Bank"} img={CreateBank}/>
                </div>
                <Card title={"Manage Question Banks"} img={ManageBank}/>
            </div>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Recent Banks</h1>
            {banksAvail ? (
                <>
                </>
            ) : (
                <div className='bg-gray-900 ml-[8rem] mr-[2rem] rounded-md'>
                    <div className='flex flex-col p-5 w-full justify-center items-center'>
                        <img src={EmptyBox} className='w-[10rem] opacity-45 grayscale' />
                        <span className='text-xl text-gray-400 w-1/10 text-center'>Recent banks will appear here!</span>
                    </div>
                </div>
            )}
            {creatingBank && (
                <CreatePanel />
            )}
        </div>
    )
}

export default QuestionBank