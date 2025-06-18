import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
const AreaGraficos = () => {
  return (
    <div className='h-[280px] w-[500px] m-5 justify-center items-center shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] border-[1px] border-[#394976] rounded-[40px]  flex flex-col '>
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      height={250}
      margin={{ top: 10, bottom: 5, left: -20, right: 3 }}
      
    
    />
    <h1 className=' text-[18px] text-white font-bold'>VELOCIDADExTEMPO</h1>
    
    </div>
    
  )
}

export default AreaGraficos