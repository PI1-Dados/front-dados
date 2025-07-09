import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { updateExperiment } from '../api/routes'; 

const ModalEdicao = ({ isOpen, onClose, experimentData }) => {
  
  const [formData, setFormData] = useState({
    nomeExperimento: '',
    distanciaAlvo: '',
    dataExperimento: '',
    pressaoBar: '',
    volumeAgua: '',
    massaTotalFoguete: '',
  });

  
  useEffect(() => {
    if (experimentData) {
      setFormData({
        nomeExperimento: experimentData.nomeExperimento || '',
        distanciaAlvo: experimentData.distanciaAlvo || '',
        dataExperimento: experimentData.dataExperimento ? new Date(experimentData.dataExperimento).toISOString().split('T')[0] : '',
        pressaoBar: experimentData.pressaoBar || '',
        volumeAgua: experimentData.volumeAgua || '',
        massaTotalFoguete: experimentData.massaTotalFoguete || '',
      });
    }
  }, [experimentData]); 

  if (!isOpen) {
    return null;
  }

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!experimentData) {
      console.error("Nenhum dado de experimento para atualizar.");
      return;
    }

    // realiza cópia dos dados para formatar data
    const dataToSend = new FormData();
    const dataToProcess = { ...formData };

    if (dataToProcess.dataExperimento) {
        const parts = dataToProcess.dataExperimento.split('-'); // Divide "2024-07-02" em ["2024", "07", "02"]
        if (parts.length === 3) {
            dataToProcess.dataExperimento = `${parts[2]}/${parts[1]}/${parts[0]}`; // Monta "02/07/2024"
        }
    }

    for (const key in dataToProcess) {
      dataToSend.append(key, dataToProcess[key]);
    }

    try {
      const response = await updateExperiment(experimentData.id, dataToSend);
      console.log('Sucesso:', response);
      alert('Experimento atualizado com sucesso!');
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar o formulário:', error);
      alert('Falha ao atualizar o experimento.');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Animação do modal */}
      <style>{`
        @keyframes fade-in-scale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }
      `}</style>
      
      {/* Conteúdo do Modal */}
      <div
        onClick={handleModalContentClick}
        className="relative w-full max-w-2xl rounded-2xl border border-blue-500/50 bg-[#0A192F] p-8 text-white shadow-2xl shadow-blue-500/20 transform animate-fade-in-scale"
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar modal"
        >
           <X size={24} />
        </button>

        {/* Cabeçalho */}
        <h2 className="text-center text-2xl font-bold tracking-wider text-gray-200 mb-8">
          EDITAR LANÇAMENTO
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
         
            {[
              { label: 'NOME DO EXPERIMENTO', id: 'nomeExperimento', type: 'text' },
              { label: 'DISTÂNCIA ALVO (m)', id: 'distanciaAlvo', type: 'number' },
              { label: 'DATA', id: 'dataExperimento', type: 'date' },
              { label: 'PRESSÃO (bar)', id: 'pressaoBar', type: 'number' },
              { label: 'VOLUME ÁGUA (ml)', id: 'volumeAgua', type: 'number' },
              { label: 'MASSA (g)', id: 'massaTotalFoguete', type: 'number' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-400 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none"
                  required
                />
              </div>
            ))}
          </div>

          {/* Botão de Ação */}
          <div className="mt-8 flex flex-col space-y-4">
            <button type="submit" className="w-full rounded-lg bg-green-500 py-3.5 text-base font-semibold text-slate-900 shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              SALVAR ALTERAÇÕES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEdicao;
