import React from 'react';


const StatusBadge = ({ status }) => {
  const baseClasses = 'font-bold uppercase text-xs';
  let colorClass = '';

  switch (status.toLowerCase()) {
    case 'sucesso':
      colorClass = 'text-green-400';
      break;
    case 'falha':
      colorClass = 'text-red-400';
      break;
    case 'em andamento':
      colorClass = 'text-yellow-400';
      break;
    default:
      colorClass = 'text-gray-400';
  }

  return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
};


const TabelaExp = ({ experiments }) =>{
  return (
    <div className='w-full flex justify-center items-center p-5'>
      <div className="w-full overflow-hidden rounded-[20px] border border-[#394976] bg-[linear-gradient(112deg,_#161D30_20.1%,_rgba(42,53,83,0.73)_94.38%)] shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">ID</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Meta</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Data</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Horário</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Status</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((exp) => (
                  <tr key={exp.id} className="border-b border-gray-800 hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="py-4 px-4 text-gray-200 font-mono">{exp.id}</td>
                    <td className="py-4 px-4 text-gray-200">{exp.meta}</td>
                    <td className="py-4 px-4 text-gray-200">{exp.data}</td>
                    <td className="py-4 px-4 text-gray-200">{exp.horario}</td>
                    <td className="py-4 px-4"><StatusBadge status={exp.status} /></td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="bg-green-600 text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-green-700 transition-colors duration-200">VER</button>
                        <button className="bg-blue-700 text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-blue-800 transition-colors duration-200">EDITAR</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
export default TabelaExp