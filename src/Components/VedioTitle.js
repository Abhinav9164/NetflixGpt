import React from 'react'

const VedioTitle = ( {title,overview} ) => {
  return (
    <div className='absolute aspect-vedio pt-[0%] md:pt-[20%] px-16 text-white bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-xl md:text-3xl font-bold mt-40 md:mt-0 ml-15'>{title}</h1>
        <p className='hidden md:inline-block pt-6 py-6 text-sm w-1/4 font-sans'>{overview}</p>
        <div className='pt-2'>
            <button className='bg-white text-black p-2 px-6 rounded-lg'>Play</button>
            <button className='bg-white text-black hidden md:inline-block p-2 px-6 mx-2 rounded-lg'>Play Info.</button>
        </div>

    </div>
  )
}

export default VedioTitle