import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { createExperiment } from '../api/routes';

const ModalCadastro = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nomeExperimento: '',
    distanciaAlvo: '',
    dataExperimento: '',
    pressaoBar: '',
    volumeAgua: '',
    massaTotalFoguete: '',
  });

  const [arquivoDados, setCsvFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

  const fileInputRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setErrorMessage(''); // Limpa o erro se um arquivo válido for selecionado
    } else {
      setErrorMessage("Por favor, selecione um arquivo no formato .csv");
      setCsvFile(null);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa erros anteriores ao tentar enviar novamente

    const dataToSend = new FormData();
    
    // 1. Cria uma cópia dos dados do formulário para processamento
    const dataToProcess = { ...formData };

    // 2. Converte a data do formato AAAA-MM-DD para DD/MM/AAAA
    if (dataToProcess.dataExperimento) {
        const parts = dataToProcess.dataExperimento.split('-'); // Divide "2024-07-02" em ["2024", "07", "02"]
        if (parts.length === 3) {
            dataToProcess.dataExperimento = `${parts[2]}/${parts[1]}/${parts[0]}`; // Monta "02/07/2024"
        }
    }
    
    // Adiciona todos os dados do formulário (com a data já formatada) ao FormData
    for (const key in dataToProcess) {
      dataToSend.append(key, dataToProcess[key]);
    }
    
    if (arquivoDados) {
      dataToSend.append('arquivoDados', arquivoDados);
    }

    try {
      // Envia os dados para a API
      const response = await createExperiment(dataToSend);
      console.log('Sucesso:', response.data);
      onClose(); // Fecha o modal em caso de sucesso
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      // 3. Extrai e exibe a mensagem de erro retornada pela API
      const detail = error.response?.data?.detail || 'Ocorreu um erro ao registrar o lançamento.';
      setErrorMessage(detail);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <style>{`
        @keyframes fade-in-scale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }
      `}</style>
      
      <div
        onClick={handleModalContentClick}
        className="relative w-full max-w-2xl rounded-2xl border border-blue-500/50 bg-[#0A192F] p-8 text-white shadow-2xl shadow-blue-500/20 transform animate-fade-in-scale"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar modal"
        >
           <X size={24} />
        </button>

        <h2 className="text-center text-2xl font-bold tracking-wider text-gray-200 mb-8">
          REGISTRO DE LANÇAMENTO
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { label: 'NOME DO EXPERIMENTO', id: 'nomeExperimento' },
              { label: 'DISTÂNCIA ALVO (m)', id: 'distanciaAlvo', type: 'number' },
              { label: 'DATA DO LANÇAMENTO', id: 'dataExperimento', type: 'date' },
              { label: 'PRESSÃO (bar)', id: 'pressaoBar', type: 'number' },
              { label: 'VOLUME DE ÁGUA (ml)', id: 'volumeAgua', type: 'number' },
              { label: 'MASSA TOTAL (g)', id: 'massaTotalFoguete', type: 'number' },
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

          {/* Campo para exibir a mensagem de erro */}
          {errorMessage && (
            <div className="mt-6 text-center text-sm text-red-400 bg-red-900/30 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div className="mt-8 flex flex-col space-y-4">
            <input 
              type="file" 
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              type="button"
              onClick={handleImportClick}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Upload size={20} />
              IMPORTAR ARQUIVO .CSV
            </button>

            {arquivoDados && (
              <div className="text-center text-sm text-gray-300">
                Arquivo selecionado: <span className="font-medium text-green-400">{arquivoDados.name}</span>
              </div>
            )}

            <button type="submit" className="w-full rounded-lg bg-green-500 py-3.5 text-base font-semibold text-slate-900 shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              CONCLUIR CADASTRO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastro;
