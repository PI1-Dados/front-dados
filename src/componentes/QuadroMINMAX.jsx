import React from 'react'

const QuadroMINMAX = () => {
  return (
    <div className='flex flex-col justify-center items-center  w-[275px] h-[200px] shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] border-[1px] border-[#394976] rounded-[40px]  p-2 gap-3 text-white font-jura'>
        <h1 className='text-xl'>VELOCIDADE MAX:</h1>
        <h1 className='text-3xl text-[#02C85F]'>50m/s</h1>
        <h1 className='text-xl'>VELOCIDADE MÉDIA:</h1>
        <h1 className='text-3xl text-[#02C85F]'>30m/s</h1>
    </div>
  )
}

export default QuadroMINMAX  