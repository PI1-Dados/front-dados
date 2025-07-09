import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { updateExperiment } from '../api/routes'; 

const ModalEdicao = ({ isOpen, onClose, experimentData }) => {
  
  const [formData, setFormData] = useState({
    nome: '',
    distancia_alvo: '',
    data_lancamento: '',
    pressao: '',
    volume_agua_ml: '',
    massa_foguete_gramas: '',
  });

  
  useEffect(() => {
    if (experimentData) {
      setFormData({
        nome: experimentData.nome || '',
        distancia_alvo: experimentData.distancia_alvo || '',
    
        data_lancamento: experimentData.data_lancamento ? new Date(experimentData.data_lancamento).toISOString().split('T')[0] : '',
        pressao: experimentData.pressao || '',
        volume_agua_ml: experimentData.volume_agua_ml || '',
        massa_foguete_gramas: experimentData.massa_foguete_gramas || '',
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

    try {
    
      const response = await updateExperiment(experimentData.id, formData);
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
              { label: 'NOME DO EXPERIMENTO', id: 'nome', type: 'text' },
              { label: 'DISTÂNCIA ALVO (m)', id: 'distancia_alvo', type: 'number' },
              { label: 'DATA', id: 'data_lancamento', type: 'date' },
              { label: 'PRESSÃO (bar)', id: 'pressao', type: 'number' },
              { label: 'VOLUME ÁGUA (ml)', id: 'volume_agua_ml', type: 'number' },
              { label: 'MASSA (g)', id: 'massa_foguete_gramas', type: 'number' },
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
