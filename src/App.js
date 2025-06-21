import { useEffect, useState } from "react";
import "./App.css";
import Unb from "./assets/Unb.png";
import AreaGraficos from "./components/AreaGraficos";
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

  return (
    <>
      <ModalCadastro open={openCadastro} onClose={() => setOpenCadastro(false)}/>
      <div className="flex justify-center items-center w-screen bg-[#0C101C] font-jura ">
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
              <button 
                className="bg-[#008940] text-white text-2xl p-3 rounded-[25px]"
                onClick={() => setOpenCadastro(true)}
              >
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
                  {/* {experimento.experimento.nome} */}
                </h1>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <SelectVariaveis></SelectVariaveis>
                  <SelectVariaveis></SelectVariaveis>
                </div>
              </div>
              <QuadroMINMAX></QuadroMINMAX>
            </div>
          </div>
          {/*GRAFICOS*/}
          <div className=" w-full flex flex-row justify-between  ">
            <AreaGraficos></AreaGraficos>
            <AreaGraficos></AreaGraficos>
            <AreaGraficos></AreaGraficos>
          </div>
          {/*BAIXO*/}
          <div className=" justify-center items-center w-full">
            <TabelaExp experimentsData={experimentos} fetchExperimento={fetchExperimento} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;