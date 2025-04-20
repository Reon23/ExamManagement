import React, { useContext } from 'react'
import { ServerContext } from '../../../context/ServerContext'

const Home = () => {
    const { account } = useContext(ServerContext);
    return (
        <div className='fixed left-0 w-full h-screen bg-gray-800 overflow-y-auto overflow-x-hidden'>
            <h1 className='text-3xl font-bold p-10 ml-20 text-gray-300'>Welcome <span>{account.first_name || "User"} {account.last_name || ""}</span></h1>
        </div>
    )
}

export default Home