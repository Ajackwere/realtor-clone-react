import React from 'react'
import { useState } from 'react'

export default function Profile() {
  const [ formData, setFormData] = useState({
    name: "jack",
    email: "austinejackwere@gmail.com",
  });
  const {name, email} = formData;
  return (
    <>
      <section className='max-w-6xl mx-auto flex
      justify-center items-center flex-col'>
        <h1 className='text-3xl text-center 
        mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name Input */}

            <input type="text" id="name" value={name} 
            disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 
            rounded transition ease-in-out'/>

            {/* Email input*/}
            
            <input type="email" id="email" value={email} 
            disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 
            rounded transition ease-in-out'/>

            <div>
              <p>
                Do you want to change your name?
                <span>Edit</span>
              </p>
              <p> Sign Out </p>
            </div>
          
          </form>
        </div>
      </section>
    </>
  )
}
