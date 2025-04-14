import React, { useContext } from 'react'
import SidePanel from './Instructor/SidePanel'
import { ServerContext } from '../../context/ServerContext'
import Home from './Instructor/Home';


const Instructor = () => {
    const { dashMode, setDashMode } = useContext(ServerContext);
    
    return (
        <div>
            <div className='flex'>
                <Home />
                <SidePanel />
            </div>
        </div>
    )
}

export default Instructor