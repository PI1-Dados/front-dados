import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dados de exemplo para o gráfico
// Você pode substituir isso pelos seus dados reais


const ChartCard = ({ title, chartData }) => {
  return (
    <div className=" p-8
  shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px] border border-[#394976] w-full flex flex-col items-center justify-center m-2">
      <h3 className="text-white text-lg font-semibold  ">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          width={300}
          margin={{
            top: 10,
            right: 0,
            left: -20, // Ajuste para mover o YAxis mais para a esquerda
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" vertical={false} />
          <XAxis dataKey="name" stroke="#cbd5e0" tick={{ fill: '#cbd5e0' }} />
          <YAxis stroke="#cbd5e0" tick={{ fill: '#cbd5e0' }} domain={[0, 7]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2d3748',
              borderColor: '#394976',
              color: '#ffffff',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#ffffff' }}
          />
          <Area type="monotone" dataKey="value" stroke="#38a169" fill="url(#colorGradient)" strokeWidth={2} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38a169" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38a169" stopOpacity={0.0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
