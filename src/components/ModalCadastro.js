import Modal from "@mui/material/Modal"

const ModalCadastro = ({open, onClose}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="border-2 
                            border-[#394976] 
                            bg-[linear-gradient(112deg,_#161D30_20.1%,_rgba(42,53,83,0.73)_94.38%)] 
                            shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px] mt-5 w-[20vw] flex flex-col gap-2
                            w-[20vh]">
                teste
            </div>
        </Modal>
    )
}

export default ModalCadastro;