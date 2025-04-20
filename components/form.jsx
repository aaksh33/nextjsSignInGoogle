"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff } from 'lucide-react'
import SignInButton from './sign-in'

const Form = () => {
    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        password: ''
    })

    // Toggle password visibility
    function togglePassword() {
        setOpen(!open)
    }

    // Handle input changes and log updated user data
    function handleChange(e) {
        const { name, value } = e.target;
        const updatedData = {
            ...formData,
            [name]: value
        };

        setFormData(updatedData);

        // Log user data live
        console.log("Live User Data:", updatedData);
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("userData", JSON.stringify(formData));
        console.log("Submitted User Data:", formData);
    }

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='flex justify-center w-1/2 rounded-2xl shadow-2xl'>
                <form className='w-1/2 p-10 border-r-blue-800' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-semibold pb-2 text-blue-500'>SignIn Form</h1>

                    <div className='pt-2'>
                        <label htmlFor='name'>Name</label>
                        <Input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Enter your name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='py-3'>
                        <label htmlFor='gmail'>Gmail</label>
                        <Input
                            id='gmail'
                            name='gmail'
                            type='text'
                            placeholder='Enter your gmail'
                            value={formData.gmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='pb-3'>
                        <label htmlFor='password'>Password</label>
                        <div className='relative'>
                            <Input
                                id='password'
                                name='password'
                                type={open ? 'password' : 'text'}
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleChange}
                                className='pr-10'
                            />
                            <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-gray-500'>
                                {open
                                    ? <EyeOff onClick={togglePassword} size={20} className='cursor-pointer hover:text-blue-500 transition-colors duration-200' />
                                    : <Eye onClick={togglePassword} size={20} className='cursor-pointer hover:text-blue-500 transition-colors duration-200' />
                                }
                            </div>
                        </div>
                    </div>

                    <Button type='submit' className='w-full mt-7'>Sign In</Button>
                    <SignInButton />
                </form>

                <div className='w-1/2 flex items-center justify-center'>
                    <p className='text-gray-600 text-lg'>Welcome Back 👋</p>
                </div>
            </div>
        </div>
    )
}

export default Form
