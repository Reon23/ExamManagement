import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext'

const Dashboard = () => {
    const { account } = useContext(ServerContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!account) {
            navigate("/");
        }
    },[account])
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard