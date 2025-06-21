import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AccelChartCard = ({ chartData }) => {
  return (
    <div className=" p-4
  shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px] border border-[#394976] w-full flex flex-col items-center justify-center m-2">
      <h3 className="text-white text-lg font-semibold  ">Aceleração</h3>
      <ResponsiveContainer width="100%" height={250} style={{ padding: 4 }}>
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
          <XAxis dataKey="timestamp" stroke="#cbd5e0" tick={{ fill: '#cbd5e0' }} />
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
          <Area type="monotone" dataKey="accel_x" stroke="#38a169" fill="url(#accel_x_gradient)" strokeWidth={2} unit="m/s²"/>
          <Area type="monotone" dataKey="accel_y" stroke="#82ca9d" fill="url(#accel_y_gradient)" strokeWidth={2} unit="m/s²"/>        
          <Area type="monotone" dataKey="accel_z" stroke="#8884d8" fill="url(#accel_z_gradient)" strokeWidth={2} unit="m/s²"/>
          <defs>
            <linearGradient id="accel_x_gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38a169" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38a169" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="accel_y_gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="accel_z_gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccelChartCard;


