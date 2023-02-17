import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
  return (
    <div className='m-auto w-full fixed h-full grid bg-black justify-center'>
      <img
        className='max-h-[400px] m-auto'
        src='./images/error.jpg'
        alt='Page not found'
      />
      <Link to='/' className='text-gray-400 align-middle text-center'>
        Go to Home
      </Link>
    </div>
  )
}

export default Missing
