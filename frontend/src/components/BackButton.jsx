import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

function BackButton({destination="/"}) {
  return (
    <div className='flex'>
<Link to={destination} className='p-2'>
        <BsArrowLeft className='text-2xl ' />
       
</Link>

    </div>
  )
}

export default BackButton