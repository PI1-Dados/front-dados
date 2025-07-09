import Unb from "../assets/Unb.png";
import { useEffect, useState } from "react";

const Header = ({openModal, experiment, downloadCsv}) => {
 
  return (
    <div className=" w-full">
      {/*TOPO*/}
      <div className="flex justify-between p-6 items-center ">
        <img src={Unb} alt="Descrição da imagem" />
        <button onClick={openModal} className="bg-[#008940] text-white text-2xl p-3 rounded-[25px]">
          Registrar Lançamento
        </button>
        <button 
          onClick={() => downloadCsv(experiment.id)} disabled={experiment === null} 
          className="bg-[#133E79] text-white text-2xl p-3 rounded-[25px] disabled:bg-gray-600 ">
          EXPORTAR PARA CSV
        </button>
      </div>
    </div>
  )
}

export default Header;