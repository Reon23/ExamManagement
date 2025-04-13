import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServerContext } from '../context/ServerContext';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import SchoolIcon from '@mui/icons-material/School';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import instructorIcon from '../images/instructor.png';
import PersonIcon from '@mui/icons-material/Person';
import studentIcon from '../images/student.png';

const LoginPanel = () => {
    const { account, loginUser, loginFailed } = useContext(ServerContext);
    const [role, setRole] = useState('instructor');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailNotSet, setEmailNotSet] = useState(false);
    const [passwordNotSet, setPasswordNotSet] = useState(false);
    const navigate = useNavigate();

    const Login = async() => {
        if(!email) {
            setEmailNotSet(true);
        }
        if(!password) {
            setPasswordNotSet(true);
        }
        if (!email || !password) return;
        await loginUser(role, email, password)
    }

    useEffect(() => {
        if(account) navigate("/Dashboard");
    },[account])

    return (
        <>
            <div className='w-full items-center flex flex-col justify-center scale-up-center-normal'>
                <h1 className='mb-10 text-5xl font-bold cursor-default select-none'>
                    Login
                </h1>
                <div className={`flex items-center bg-gray-200 p-3 w-6/10 mt-5 rounded-md ${emailNotSet && "border-2 border-red-400"}`}>
                    <AlternateEmailIcon fontSize='large' />
                    <input name='email' type='email' placeholder='Email' className='w-full text-2xl pl-2 outline-none' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={`flex items-center bg-gray-200 p-3 w-6/10 mt-10 rounded-md ${passwordNotSet && "border-2 border-red-400"}`}>
                    <LockIcon fontSize='large' />
                    <input name='password' type='password' placeholder='Password' className='w-full text-2xl pl-2 outline-none' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center mt-5 select-none'>
                    <label className={`text-xl p-2 cursor-pointer ${role === 'instructor' ? "border-green-400 border-2 rounded-full" : "border-gray-300 border-2 rounded-full"}`}>
                        <input name='role' type='radio' checked={role === 'instructor'} onChange={() => setRole('instructor')} value={'instructor'} className='hidden peer' />
                        <EditSquareIcon />
                        <span className='pl-2'>instructor</span>
                    </label>
                    <label className={`text-xl p-2 ml-4 items-center cursor-pointer ${role === 'student' ? "border-green-400 border-2 rounded-full" : "border-gray-300 border-2 rounded-full"}`}>
                        <input name='role' type='radio' checked={role === 'student'} onChange={() => setRole('student')} value={'student'} className='hidden peer' />
                        <SchoolIcon />
                        <span className='pl-2'>student</span>
                    </label>
                </div>
                <button className='text-2xl w-6/10 font-bold text-white p-3 mt-8 bg-green-500 hover:bg-green-600 rounded-md cursor-pointer' onClick={() => {Login()}}>
                    Login
                </button>
                {loginFailed && (
                    <>
                        <span className='mt-5 text-red-500'>Failed to login!</span>
                    </>
                )}
            </div>
        </>
    )
}

const RegisterPanel = () => {
    const [role, setRole] = useState('instructor');
    return (
        <>
            <div className='w-full items-center flex flex-col justify-center scale-up-center-normal'>
                <h1 className='mb-10 text-5xl font-bold cursor-default select-none'>
                    Register
                </h1>
                {role === 'instructor' ? (
                    <div className='flex items-center bg-gray-200 p-3 w-6/10 mt-5 rounded-md scale-up-center-normal'>
                        <PersonIcon fontSize='large' />
                        <input name='userName' type='text' placeholder='User Name' className='w-full text-2xl pl-2 outline-none' />
                    </div>
                ) : (
                    <>
                        <div className='flex items-center bg-gray-200 p-3 w-6/10 mt-5 rounded-md slide-top-normal'>
                            <PersonIcon fontSize='large' />
                            <input name='firstName' type='text' placeholder='First Name' className='w-full text-2xl pl-2 outline-none' />
                        </div>
                        <div className='flex items-center bg-gray-200 p-3 w-6/10 mt-10 rounded-md slide-top-normal'>
                            <PersonIcon fontSize='large' />
                            <input name='lastName' type='text' placeholder='Last Name (optional)' className='w-full text-2xl pl-2 outline-none' />
                        </div>
                    </>
                )}
                <div className='flex items-center bg-gray-200 p-3 w-6/10 mt-10 rounded-md scale-up-center-normal'>
                    <AlternateEmailIcon fontSize='large' />
                    <input name='email' type='email' placeholder='Email' className='w-full text-2xl pl-2 outline-none' />
                </div>
                <div className='flex items-center bg-gray-200 p-3 w-6/10 mt-10 rounded-md scale-up-center-normal'>
                    <LockIcon fontSize='large' />
                    <input name='password' type='password' placeholder='Password' className='w-full text-2xl pl-2 outline-none' />
                </div>
                <div className='flex items-center mt-5 select-none'>
                    <label className={`text-xl p-2 cursor-pointer ${role === 'instructor' ? "border-blue-400 border-2 rounded-full" : "border-gray-300 border-2 rounded-full"}`}>
                        <input name='role' type='radio' checked={role === 'instructor'} onChange={() => setRole('instructor')} value={'instructor'} className='hidden peer' />
                        <EditSquareIcon />
                        <span className='pl-2'>instructor</span>
                    </label>
                    <label className={`text-xl p-2 ml-4 items-center cursor-pointer ${role === 'student' ? "border-blue-400 border-2 rounded-full" : "border-gray-300 border-2 rounded-full"}`}>
                        <input name='role' type='radio' checked={role === 'student'} onChange={() => setRole('student')} value={'student'} className='hidden peer' />
                        <SchoolIcon />
                        <span className='pl-2'>student</span>
                    </label>
                </div>
                <button className='text-2xl w-6/10 font-bold text-white p-3 mt-8 bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer'>
                    Register
                </button>
            </div>
        </>
    )
}

const Auth = () => {
    const [mode, setMode] = useState("login");
    return (
        <div className='overflow-hidden'>
            <div className={`w-screen h-screen bg-slate-800 flex justify-between`}>
                <div className='w-[50vw] h-full bg-white rounded-r-md flex flex-col items-center justify-center'>
                    {mode === 'login' ? (
                        <>
                            <LoginPanel />
                            <span className='mt-5'>Are you new?
                                <span className='text-green-500 underline cursor-pointer' onClick={() => setMode("register")}>Create an account</span>
                            </span>
                        </>
                    ) : (
                        <>
                            <RegisterPanel />
                            <span className='mt-5'>Have an account?
                                <span className='text-blue-500 underline cursor-pointer' onClick={() => setMode("login")}>Click to login</span>
                            </span>
                        </>
                    )}
                </div>
                <div className='w-1/2 flex justify-center items-center select-none'>
                    <img
                        key={mode}
                        src={mode === "login" ? instructorIcon : studentIcon}
                        className={`${mode === "login" ? "w-8/12" : ""} slide-left-normal `} />
                </div>

            </div>
        </div>
    )
}

export default Auth