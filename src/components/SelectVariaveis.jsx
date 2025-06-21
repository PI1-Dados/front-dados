import React from "react";
import { useState } from "react";
import Select,{ components }  from "react-select";
const interesses = [
  { value: "esportes", label: "Esportes" },
  { value: "musica", label: "Música" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "arte", label: "Arte e Cultura" },
  { value: "viagens", label: "Viagens" },
  { value: "culinaria", label: "Culinária" },
];
const MAX_SELECOES = 3;
const SelectVariaveis = () => {
  const [selecionados, setSelecionados] = useState([]);

  const handleSelectChange = (opcoesSelecionadas) => {
   
    if (opcoesSelecionadas && opcoesSelecionadas.length > MAX_SELECOES) {
      
      alert(`Você só pode selecionar no máximo ${MAX_SELECOES} interesses.`);
      return; 
    }
    setSelecionados(opcoesSelecionadas);
  };

 
  const isOptionDisabled = (option) => {
    return (
      selecionados.length >= MAX_SELECOES &&
      !selecionados.find((s) => s.value === option.value)
    );
  };
  const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#1A202C', // Cor de fundo principal (ex: cinza escuro) 
    borderRadius: '40px', // Borda arredondada
    height: '65px',
    borderColor: state.isFocused ? '#4A5568' : '#2D3748', // Cor da borda
    boxShadow: state.isFocused ? '0 0 0 1px #4A5568' : 'none',
    '&:hover': {
      borderColor: '#4A5568',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#A0AEC0', // Cor do texto do placeholder
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: '15px',
    backgroundColor: state.isSelected
      ? '#4A5568' // Cor da opção selecionada
      : state.isFocused
      ? '#2D3748' // Cor da opção em foco (hover)
      : '#1A202C', // Cor de fundo das opções
    color: '#E2E8F0', // Cor do texto das opções
    ':active': {
      backgroundColor: '#4A5568',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#4A5568',
    borderRadius: '40px', // Cor de fundo da "pílula" do item selecionado
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#E2E8F0', // Cor do texto dentro da pílula
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '4px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#A0AEC0',
    ':hover': {
      backgroundColor: '#E53E3E',
      color: 'white',
    },
  }),
  input: (provided) => ({
    ...provided,
    color: '#E2E8F0', // Cor do texto que você digita para buscar
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#E2E8F0',
  }),
  menu: (provided) => ({
      ...provided,
      backgroundColor: '#1A202C',
      borderRadius: '15px', // Cor de fundo do menu dropdown
  })
};
const CustomMultiValueLabel = (props) => {
  return (
    <components.MultiValueLabel {...props}>
      {props.data.label[0]} {/* Mostra apenas a primeira letra */}
    </components.MultiValueLabel>
  );
};

  return (
    <div >
      <Select
        className=" min-w-[200px] shadow-[30px_24px_21.2px_-1px_rgba(4,6,12,0.24)] rounded-[40px]"
        isMulti
        options={interesses}
        value={selecionados}
        onChange={handleSelectChange}
        isOptionDisabled={isOptionDisabled}
        placeholder="Selecione..."
        closeMenuOnSelect={false}
        
        // --- Aplicando as customizações ---
        styles={customStyles}
        components={{ MultiValueLabel: CustomMultiValueLabel }}
      />
    </div>
  );
};

export default SelectVariaveis;
