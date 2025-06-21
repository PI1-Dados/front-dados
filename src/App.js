import { useEffect, useState } from "react";
import "./App.css";
import React, { useState } from "react";
import Unb from "./assets/Unb.png";
import ChartCard from "./components/AreaGraficos";
import QuadroInfo from "./components/QuadroInfo";
import QuadroMINMAX from "./components/QuadroMINMAX";
import SelectVariaveis from "./components/SelectVariaveis";
import TabelaExp from "./components/TabelaExp";
import { getExperiment, getExperiments } from "./api/routes";
import ModalCadastro from "./components/ModalCadastro";

function App() {
  // modais
  const [openCadastro, setOpenCadastro] = useState(false);

  const [experimentos, setExperimentos] = useState([]);
  const [experimento, setExperimento] = useState(null);
  
  useEffect(() => {
    const fetchExperimentos = async () => {
      try {
        const response = await getExperiments();
        // console.log(response);
        setExperimentos(response.experimentos);
      } catch (err) {
        console.error(err);
      }
    }
    fetchExperimentos();
  }, [])

  const fetchExperimento = async (id) => {
    try {
      const response = await getExperiment(id);
      console.log(response);
      setExperimento(response);
    } catch (err) {
      console.error(err);
    }
  }

  const mockChartData = {
    velocidade: [
      { name: "0s", value: 0 },
      { name: "1s", value: 10 },
      { name: "2s", value: 25 },
      { name: "3s", value: 45 },
      { name: "4s", value: 70 },
      { name: "5s", value: 100 },
    ],
    altura: [
      { name: "0s", value: 1000 },
      { name: "1s", value: 980 },
      { name: "2s", value: 940 },
      { name: "3s", value: 880 },
      { name: "4s", value: 800 },
      { name: "5s", value: 700 },
    ],
    distancia: [
      { name: "0s", value: 0 },
      { name: "1s", value: 100 },
      { name: "2s", value: 210 },
      { name: "3s", value: 330 },
      { name: "4s", value: 460 },
      { name: "5s", value: 600 },
    ],
    aceleracao: [
      { name: "0s", value: 10 },
      { name: "1s", value: 15 },
      { name: "2s", value: 20 },
      { name: "3s", value: 25 },
      { name: "4s", value: 30 },
      { name: "5s", value: 35 },
    ],
  };

  const interesses = [
    { value: "velocidade", label: "Velocidade" },
    { value: "altura", label: "Altura" },
    { value: "distancia", label: "Distancia" },
    { value: "aceleracao", label: "Aceleração" },
  ];
  const experimentsData = [
    {
      id: 1,
      meta: "10M",
      data: "20/05/2025",
      horario: "16:00",
      status: "Falha",
    },
    {
      id: 2,
      meta: "20M",
      data: "22/05/2025",
      horario: "16:00",
      status: "Sucesso",
    },
    {
      id: 3,
      meta: "5M",
      data: "23/05/2025",
      horario: "10:30",
      status: "Em Andamento",
    },
    {
      id: 4,
      meta: "50M",
      data: "28/05/2025",
      horario: "19:00",
      status: "Sucesso",
    },
    {
      id: 5,
      meta: "15M",
      data: "30/05/2025",
      horario: "11:00",
      status: "Falha",
    },
    {
      id: 6,
      meta: "100M",
      data: "02/06/2025",
      horario: "09:00",
      status: "Sucesso",
    },
  ];

  const unidades = {
    velocidade: "m/s",
    altura: "m",
    distancia: "m",
    aceleracao: "m/s²",
};

  const [opcoesGraficos, setOpcoesGraficos] = useState([interesses[0]]);
  const [variavelQuadro, setVariavelQuadro] = useState(interesses[1]);
  
  const dadosVariavelQuadro = {
        ...variavelQuadro,
        data: mockChartData[variavelQuadro.value]
    };
    
    // Pega a unidade correta com base na variável selecionada
    const unidadeSelecionada = unidades[variavelQuadro.value];
  console.log("Dados da variável do quadro:", dadosVariavelQuadro);
  const getGridColsClass = () => {
    const count = opcoesGraficos.length;
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 lg:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };
  return (
    <div className="flex justify-center items-center  w-screen bg-[#0C101C] font-jura ">
      <div
        className="border-2 
  border-[#394976] 
  bg-[linear-gradient(112deg,_#161D30_20.1%,_rgba(42,53,83,0.73)_94.38%)] 
  shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px] mt-5 w-[90vw] flex flex-col gap-2"
      >
        <div className=" w-full">
          {/*TOPO*/}
          <div className="flex justify-between p-6 items-center ">
            <img src={Unb} alt="Descrição da imagem" />
            <button className="bg-[#008940] text-white text-2xl p-3 rounded-[25px]">
              Registrar Lançamento
            </button>
            <button className="bg-[#133E79] text-white text-2xl p-3 rounded-[25px]">
              DOWNLOAD CSV
            </button>
          </div>
        </div>
        {/*MEIO*/}
        <div className=" w-full">
          <div className="flex flex-row justify-between items-center p-4">
            <QuadroInfo />
            <div className="flex flex-col justify-center items-center ">
              <h1 className=" text-[64px] font-bold  text-white mb-2">
                LANÇAMENTO Nº
              </h1>
              <div className="flex flex-row gap-3 justify-between items-center w-full">
                 <SelectVariaveis selecionados={opcoesGraficos} onSelectionChange={setOpcoesGraficos} options={interesses} placeholder="Selecione até 3 variáveis para os gráficos..." isMulti={true} maxSelections={3}/>
                 <SelectVariaveis selecionados={variavelQuadro} onSelectionChange={setVariavelQuadro} options={interesses} placeholder="Selecione uma variável..." isMulti={false}/>
              </div>
            </div>
            <QuadroMINMAX variable={dadosVariavelQuadro} unit={unidadeSelecionada} />
          </div>
        </div>
        {/*GRAFICOS*/}
        {opcoesGraficos.length > 0 ? (
          <main className={`grid ${getGridColsClass()} gap-3 w-full px-7`}>
            {opcoesGraficos.map((opcao) => (
              <ChartCard
                key={opcao.value}
                title={opcao.label}
                chartData={mockChartData[opcao.value]}
              />
            ))}
          </main>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-2xl">Nenhuma variável selecionada.</p>
            <p>
              Por favor, selecione uma ou mais opções para começar a visualizar
              os dados.
            </p>
          </div>
        )}
        {/*BAIXO*/}
        <div className=" justify-center items-center w-full">
          <TabelaExp experiments={experimentsData} />
        </div>
      </div>
    </>
  );
}
export default App;
