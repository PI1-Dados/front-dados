import React from 'react';

// const StatusBadge = ({ status }) => {
//   const baseClasses = 'font-bold uppercase text-xs';
//   let colorClass = '';

//   switch (status.toLowerCase()) {
//     case 'sucesso':
//       colorClass = 'text-green-400';
//       break;
//     case 'falha':
//       colorClass = 'text-red-400';
//       break;
//     case 'em andamento':
//       colorClass = 'text-yellow-400';
//       break;
//     default:
//       colorClass = 'text-gray-400';
//   }

//   return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
// };


const TabelaExp = ({ experimentsData, fetchExperimento }) =>{
  return (
    <div className='w-full flex justify-center items-center p-5'>
      <div className="w-[100%] items-center justify-center    rounded-[20px] border border-[#394976] bg-[linear-gradient(112deg,_#161D30_20.1%,_rgba(42,53,83,0.73)_94.38%)] shadow-lg">
          {/* A Tabela */}
          <table className="w-full  text-left">
            
            {/* Cabeçalho da Tabela */}
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">ID Experimento</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Meta</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Data</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Massa Total</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Pressão</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase">Volume</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-300 uppercase text-center">Ações</th>
              </tr>
            </thead>

            {/* Corpo da Tabela */}
            <tbody>
              {experimentsData.map((exp) => (
                <tr key={exp.id} className="border-b border-gray-800 hover:bg-slate-800/50">
                  
                  {/* Células de Dados */}
                  <td className="py-4 px-4 text-gray-200">{exp.id}</td>
                  <td className="py-4 px-4 text-gray-200">{exp.distancia_alvo}</td>
                  <td className="py-4 px-4 text-gray-200">{exp.data}</td>
                  <td className="py-4 px-4 text-gray-200">{exp.massa_total_foguete} g</td>
                  <td className="py-4 px-4 text-gray-200">{exp.pressao_psi} bar</td>
                  <td className="py-4 px-4 text-gray-200">{exp.volume_agua}ml</td>
                  
                  {/* Célula de Ações com os botões */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        className="bg-green-600 text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-green-700 transition-colors duration-200"
                        onClick= {() => fetchExperimento(exp.id)}
                      >
                        VER
                      </button>
                      <button className="bg-blue-700 text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-blue-800 transition-colors duration-200">
                        EDITAR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>
  );
}

export default TabelaExp;