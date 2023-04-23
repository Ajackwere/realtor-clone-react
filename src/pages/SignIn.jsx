import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const [showPassword] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });
    const {email, password} = formData;
    function onChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" 
                alt="key"
                className="w-full rounded-2xl"
                />
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                <form>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                    placeholder='Email address'
                    className='mb-6 w-full px-4 py-2 text-xl
                    text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out'
                    />
                    <div>
                    <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder='Password'
                    className='w-full px-4 py-2 text-xl
                    text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out'
                    />
                    </div>
                    <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                        <p className='mb-6'>
                            Don't have an account?
                            <Link to={"/sign-up"}
                                className="text-red-500 hover:text-red-800
                                transition duration-200 ease-in-out ml-1">Register </Link>
                        </p>
                        <p>
                            <Link to={"forgot-password"} className="text-blue-600 hover:text-blue-900
                                transition duration-200 ease-in-out ml-1"> Forgot password?</Link>
                        </p>
                    </div>
                </form>
                <button className='w-ful bg-blue-500 text-white px-7 py-3
                text-sm font-medium uppercase rounded 
                shadow-md hover:bg-blue-700 
                transition duration-150 ease-in-out 
                hover:shadow-lg active:bg-blue-800'
                type="submit">Sign In</button>
            </div>
        </div>
    </section>
  )
}
