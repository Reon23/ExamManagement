import React from 'react'
import Exams from './Student/Exams'
import Results from './Student/utils/Results'
import Home from './Student/Home'
import { Route, Routes } from 'react-router-dom'
import SidePanel from './Student/SidePanel'

const Student = () => {
  return (
        <div>
            <div className='flex'>
                <Routes>
                    <Route path='' element={<Home />}/>
                    <Route path='exams/*' element={<Exams />} />
                    <Route path='results/*' element={<Results />} />
                </Routes>
                <SidePanel />
            </div>
        </div>
  )
}

export default Student