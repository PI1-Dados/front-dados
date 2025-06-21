import React, {useMemo} from 'react'

const QuadroMINMAX = ({ variable, unit }) => {
    // useMemo para evitar recálculos desnecessários
    const stats = useMemo(() => {
        if (!variable || !variable.data || variable.data.length === 0) {
            return { max: 0, avg: 0 };
        }
        const values = variable.data.map(item => item.value);
        const max = Math.max(...values);
        const avg = values.reduce((acc, val) => acc + val, 0) / values.length;
        return { max, avg: avg.toFixed(1) };
    }, [variable]);

    const variableName = variable ? variable.label : "N/D";

    return (
        <div className='flex flex-col justify-center items-center w-[275px] h-[200px] shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] border-[1px] border-[#394976] rounded-[40px] p-2 gap-3 text-white font-jura'>
            <h1 className='text-xl'>{variableName} MAX:</h1>
            <h1 className='text-3xl text-[#02C85F]'>{stats.max}{unit}</h1>
            <h1 className='text-xl'>{variableName} MÉDIA:</h1>
            <h1 className='text-3xl text-[#02C85F]'>{stats.avg}{unit}</h1>
        </div>
    )
}

export default QuadroMINMAX  