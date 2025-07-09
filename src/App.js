import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import ChartCard from "./components/ChartCard";
import QuadroInfo from "./components/QuadroInfo";
import QuadroMINMAX from "./components/QuadroMINMAX";
import SelectVariaveis from "./components/SelectVariaveis";
import TabelaExp from "./components/TabelaExp";
import { downloadCsv, getExperiment, getExperiments } from "./api/routes";
import ModalCadastro from "./components/ModalCadastro";
import ModalEdicao from "./components/ModalEdicao";
import Header from "./components/Header";
import AddchartTwoToneIcon from '@mui/icons-material/AddchartTwoTone';
import AccelChartCard from "./components/AccelChartCard";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  
  const [experiments, setExperiments] = useState([]);
  const [experiment, setExperiment] = useState(null);
  const [rawChartData, setRawChartData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [dadosVariavelQuadro, setDadosVariavelQuadro] = useState(null);

  const interesses = [
    { value: "velocity", label: "Velocidade" },
    { value: "height", label: "Altura" },
    { value: "distance", label: "Distancia" },
    { value: "acceleration", label: "Aceleração" },
  ];

  const unidades = {
    velocity: "km/h",
    height: "m",
    distance: "m",
    acceleration: "m/s²",
  };

  const [opcoesGraficos, setOpcoesGraficos] = useState([interesses[0]]);
  const [variavelQuadro, setVariavelQuadro] = useState(interesses[0]);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await getExperiments();
        setExperiments(response.experimentos);
      } catch (err) {
        toast.error("Erro ao carregar experimentos!");
        console.error(err);
      }
    }
    fetchExperiments();
  }, [])

  const fetchExperiment = async (id) => {
    try {
      const response = await getExperiment(id);
      setExperiment(response.experimento);
      console.log(experiment)
      setRawChartData(response.dados_associados);
    } catch (err) {
      toast.error("Erro ao carregar experimento!");
      console.error(err);
    }
  }
  
  const handleOpenEditModal = (expData) => {
    setExperiment(expData); 
    openEditModal();       
  };

  const fetchCsv = async (id) => {
    try {
      const response = await downloadCsv(id);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `arquivo-${id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);      
    }
  }

  useEffect(() => {
    if (rawChartData == null) return;
    const formatChartData = () => {
      const velocity = [], distance = [], acceleration = [], height = [];
      rawChartData.forEach((data) => {
        velocity.push({ timestamp: data.timestamp, velocity: data.speed_kmph, unit: "km/h" });
        distance.push({ timestamp: data.timestamp, distance: parseFloat(data.distancia.toFixed(2)) });
        acceleration.push({ timestamp: data.timestamp, accel_x: data.accel_x, accel_y: data.accel_y, accel_z: data.accel_z });
        height.push({ timestamp: data.timestamp, height: data.altura_lancamento });
      });
      setChartData({ velocity, distance, acceleration, height });
    }
    formatChartData();
  }, [rawChartData, experiment]);

  useEffect(() => {
    if (chartData == null) return;
    setDadosVariavelQuadro({
      ...variavelQuadro,
      data: chartData[variavelQuadro.value]
    });
  }, [chartData, variavelQuadro]);

  const unidadeSelecionada = unidades[variavelQuadro.value];

  const getGridColsClass = () => {
    const count = opcoesGraficos.length;
    return count === 1 ? "grid-cols-1" : count === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 lg:grid-cols-3";
  };

  return (
    <div className="flex justify-center items-center w-screen bg-[#0C101C] font-jura">
      <ModalCadastro isOpen={isModalOpen} onClose={closeModal} />
      <ModalEdicao 
        isOpen={isEditModalOpen} 
        onClose={closeEditModal} 
        experimentData={experiment}
      />

      <div className="border-2 border-[#394976] bg-[linear-gradient(112deg,_#161D30_20.1%,_rgba(42,53,83,0.73)_94.38%)] shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px] mt-5 w-[90vw] flex flex-col gap-2">
        <Header openModal={openModal} experiment={experiment} downloadCsv={fetchCsv}/>
        
        {chartData != null && experiment != null ? (
          <>
            <div className="w-full">
              <div className="flex flex-row justify-between items-center p-4">
                <QuadroInfo experiment={experiment} />
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center gap-4">
                    <h1 className="text-[64px] font-bold text-white mb-2">
                      {experiment.nomeExperimento}
                    </h1>
  
                    <button 
                      onClick={() => handleOpenEditModal(experiment)}
                      className="p-2 flex justify-center mt-4 align-middle items-center mb-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                      title="Editar Experimento"
                    >
                      <Edit size={24} />
                    </button>
                  </div>
                  <div className="flex flex-row gap-3 justify-between items-center w-full">
                    <SelectVariaveis
                      selecionados={opcoesGraficos}
                      onSelectionChange={setOpcoesGraficos}
                      options={interesses}
                      placeholder="Selecione até 3 variáveis..."
                      isMulti={true}
                      maxSelections={3}
                    />
                    <SelectVariaveis
                      selecionados={variavelQuadro}
                      onSelectionChange={setVariavelQuadro}
                      options={interesses}
                      placeholder="Selecione uma variável..."
                      isMulti={false}
                    />
                  </div>
                </div>
                <QuadroMINMAX 
                  variable={dadosVariavelQuadro}
                  label={variavelQuadro.value}
                  unit={unidadeSelecionada}
                />
              </div>
            </div>
            
            {opcoesGraficos.length > 0 ? (
              <main className={`grid ${getGridColsClass()} gap-3 w-full px-7`}>
                {opcoesGraficos.map((opcao) => 
                  opcao.value === "acceleration" ? (
                    <AccelChartCard key={opcao.value} chartData={chartData.acceleration} />
                  ) : (
                    <ChartCard
                      key={opcao.value}
                      title={opcao.label}
                      dataKey={opcao.value}
                      chartData={chartData[opcao.value]}
                      unit={unidades[opcao.value]}
                      experiment={experiment}
                    />
                  )
                )}
              </main>
            ) : (
              <div className="text-center text-gray-500 mt-16">
                <p className="text-2xl">Nenhuma variável selecionada.</p>
                <p>Selecione uma ou mais opções para visualizar os dados.</p>
              </div>
            )}
          </>        
        ) : (
          <div className="text-center text-gray-500 mt-16">
            <AddchartTwoToneIcon sx={{ fontSize: 128 }} />
            <p className="text-2xl">Selecione um experimento</p>
            <p>Escolha um experimento na tabela abaixo para começar.</p>
          </div>
        )}
        
        <div className="justify-center items-center w-full">
          <TabelaExp
            experimentsData={experiments}
            fetchExperimento={fetchExperiment}
            onEdit={handleOpenEditModal} 
          />
        </div>
      </div>
    </div>
  );
}
export default App;
