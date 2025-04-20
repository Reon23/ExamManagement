import React, { useContext, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { ServerContext } from '../../../context/ServerContext';
import { useNavigate } from 'react-router-dom';
import { handleNavigation } from './utils/Navigation';

const SidePanel = () => {
    const { setAccount } = useContext(ServerContext);
    const [sidePanelExpand, setSidePanelExpand] = useState(false);
    const navigate = useNavigate();

    const expandSidePanel = () => {
        if(!sidePanelExpand) setSidePanelExpand(true);
    }
    
    const collapseSidePanel = () => {
        if(sidePanelExpand) setSidePanelExpand(false);
    }

    const logout = () => {
        setAccount("");
    }
    
    return (
        <>
            <div className='h-screen w-[5rem] hover:w-[18rem] relative z-10 'onMouseEnter={expandSidePanel} onMouseLeave={collapseSidePanel}>
                <div className='flex flex-col p-5 text-xl text-white'>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md' onClick={() => handleNavigation(navigate, "")}>
                        <HomeIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2 fade-in-left-normal'>Home</span>
                        )}
                    </span>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md' onClick={() => handleNavigation(navigate, "exams")}>
                        <EditNoteIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2 fade-in-left-normal'>Exams</span>
                        )}
                    </span>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md' onClick={() => handleNavigation(navigate, "results")}>
                        <EditNoteIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2 fade-in-left-normal'>Results</span>
                        )}
                    </span>
                    <div className='absolute bottom-10 w-10/12'>
                        <button className='flex items-center cursor-pointer hover:bg-slate-900 p-2 rounded-md w-full' onClick={logout}>
                            <LogoutIcon fontSize='large' />
                            {sidePanelExpand && (
                                <span className='ml-2 fade-in-left-normal'>Log out</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div key={sidePanelExpand} className={`fixed top-0 z-0 w-[18rem] h-screen bg-slate-950 transition ease-in-out ${sidePanelExpand ? "move-in-left" : "move-in-left-reverse"}`}>
            </div>
        </>
    )
}

export default SidePanel