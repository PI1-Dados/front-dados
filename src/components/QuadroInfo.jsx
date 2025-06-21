import React from 'react'

const QuadroInfo = ({ experiment }) => {
  return (
    <div className='flex flex-col justify-center items-center shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)]  w-[275px] h-[200px] border-[1px] border-[#394976] rounded-[40px]  p-2 gap-3 text-white font-jura'>
        <h1 className='text-xl'>META: <span className='text-2xl text-[#02C85F]'>{experiment.distancia_alvo}M</span></h1>
        <h1 className='text-xl'>PESO: <span className='text-2xl text-[#02C85F]'>{experiment.massa_total_foguete}G</span></h1>
        <h1 className='text-xl'>PRESSÃO: <span className='text-2xl text-[#02C85F]'>{experiment.pressao_psi} BAR</span></h1>
        <h1 className='text-xl'>QTDÁGUA: <span className='text-2xl text-[#02C85F]'>{experiment.volume_agua}ML</span></h1>
    </div>
  )
}

export default QuadroInfo   