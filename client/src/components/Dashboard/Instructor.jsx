import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';

const SidePanel = () => {
    const [sidePanelExpand, setSidePanelExpand] = useState(false);

    const expandSidePanel = () => {
        if(!sidePanelExpand) setSidePanelExpand(true);
    }
    const collapseSidePanel = () => {
        if(sidePanelExpand) setSidePanelExpand(false);
    }
    return (
        <>
            <div className='w-22 h-screen hover:w-2/10 bg-slate-950' onMouseEnter={expandSidePanel} onMouseLeave={collapseSidePanel}>
                <div className='flex flex-col p-5 text-xl text-white'>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md'>
                        <HomeIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2'>Home</span>
                        )}
                    </span>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md'>
                        <LibraryBooksIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2'>Question Banks</span>
                        )}
                    </span>
                    <span className='flex items-center mt-5 cursor-pointer hover:bg-slate-900 p-2 rounded-md'>
                        <EditNoteIcon fontSize='large' />
                        {sidePanelExpand && (
                            <span className='ml-2'>Exams</span>
                        )}
                    </span>
                    <div className='absolute bottom-10 w-2/12'>
                        <span className='flex items-center cursor-pointer hover:bg-slate-900 p-2 rounded-md w-full'>
                            <LogoutIcon fontSize='large' />
                            {sidePanelExpand && (
                                <span className='ml-2'>Log out</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

const Home = () => {
    return (
        <>
        </>
    )
}

const Instructor = () => {
    return (
        <div>
            <SidePanel />
            <Home />
        </div>
    )
}

export default Instructor