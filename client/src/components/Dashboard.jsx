import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext'
import Instructor from './Dashboard/Instructor';
import Loader from './Loader';

const Dashboard = () => {
    const { account } = useContext(ServerContext);
    const [loadingDash, setLoadingDash] = useState(true);
    const navigate = useNavigate();

    // Ensures user is logged in before navigating to the dashboard
    useEffect(() => {
        if(!account) {
            navigate("/");
        }
    },[account])

    // Hide dash while loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingDash(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);


    return (
        <div>
            <Routes>
                <Route path='instructor/*' element={
                    <>
                        <Instructor />
                        {loadingDash && (
                            <>
                                <div className='absolute z-40 top-0 left-0 bg-black w-screen h-screen' />
                                <div className='absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center scale-up-center-normal'>
                                    <div className='flex flex-col items-center'>
                                        <Loader />
                                        <span className='text-white text-xl mt-5 animate-pulse'>Loading</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                } />
            </Routes>
        </div>
    )
}

export default Dashboard