import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import axios from 'axios';

const ModalCadastro = ({isOpen, onClose}) => {
    const [formData, setFormData] = useState({
    nome: '',
    distancia_alvo: '',
    data: '',
    pressao: '',
    qtd_agua: '',
    peso: '',
  });

 
  const [csvFile, setCsvFile] = useState(null);
  
  
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
    } else {
     
      console.error("Por favor, selecione um arquivo .csv");
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
    
    const dataToSend = new FormData();

    
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    
    if (csvFile) {
      dataToSend.append('csvFile', csvFile);
    }

    try {
    
      const response = await axios.post('/api/lancamento', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Sucesso:', response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      
    }
  };

  return (
   
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
    
      <style>{`
        @keyframes fade-in-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
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
          REGISTRO DE LANÇAMENTO
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { label: 'Nome', id: 'nome' },
              { label: 'DISTÂNCIA ALVO', id: 'distancia_alvo' },
              { label: 'DATA', id: 'data', type: 'date' },
              { label: 'PRESSÃO', id: 'pressao' },
              { label: 'QTD ÁGUA', id: 'qtd_agua' },
              { label: 'PESO', id: 'peso' },
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

          {/* Botões de Ação */}
          <div className="mt-8 flex flex-col space-y-4">
           
            <input 
              type="file" 
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Botão para importar CSV */}
            <button 
              type="button"
              onClick={handleImportClick}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Upload size={20} />
              IMPORTAR CSV
            </button>

            {/* Exibe o nome do arquivo selecionado */}
            {csvFile && (
              <div className="text-center text-sm text-gray-300">
                Arquivo selecionado: <span className="font-medium text-green-400">{csvFile.name}</span>
              </div>
            )}

            <button type="submit" className="w-full rounded-lg bg-green-500 py-3.5 text-base font-semibold text-slate-900 shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              CONCLUIR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastro;