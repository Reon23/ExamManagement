import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext'
import Instructor from './Dashboard/Instructor';

const Dashboard = () => {
    const { account } = useContext(ServerContext);
    const navigate = useNavigate();

    // Ensures user is logged in before navigating to the dashboard
    // useEffect(() => {
    //     if(!account) {
    //         navigate("/");
    //     }
    // },[account])
    
    return (
        <div>
           <Instructor />
        </div>
    )
}

export default Dashboard