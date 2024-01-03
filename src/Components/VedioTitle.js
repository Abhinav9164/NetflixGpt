import React from 'react'

const VedioTitle = ( {title,overview} ) => {
  return (
    <div className='absolute aspect-vedio pt-[20%] px-16 text-white bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='pt-6 py-6 text-sm w-1/4 font-sans'>{overview}</p>
        <div className=' pt-2'>
            <button className='bg-white text-black p-2 px-6 rounded-lg'>Play</button>
            <button className='bg-white text-black p-2 px-6 mx-2 rounded-lg'>Play Info.</button>
        </div>

    </div>
  )
}

export default VedioTitle