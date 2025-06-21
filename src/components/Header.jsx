import Unb from "../assets/Unb.png";

const Header = () => {
  return (
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
  )
}

export default Header;