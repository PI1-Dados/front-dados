import React from "react";
import { useState } from "react";
import Select, { components } from "react-select";

const SelectVariaveis = ({ selecionados, onSelectionChange, options, placeholder, isMulti = true, maxSelections = Infinity }) => {
  const [showError, setShowError] = useState(false);

  const handleSelectChange = (opcoesSelecionadas) => {
    if (isMulti && opcoesSelecionadas && opcoesSelecionadas.length > maxSelections) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setShowError(false);
    onSelectionChange(opcoesSelecionadas);
  };

  const isOptionDisabled = (option) => (
    isMulti && selecionados.length >= maxSelections && !selecionados.find((s) => s.value === option.value)
  );

  const customStyles = {
    control: (p, s) => ({ ...p, backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: '40px', minHeight: '65px', borderColor: s.isFocused ? '#394976' : '#394976', boxShadow: 'none', '&:hover': { borderColor: '#4A5568' } }),
    placeholder: (p) => ({ ...p, color: '#A0AEC0' }),
    option: (p, s) => ({ ...p, borderRadius: '15px', margin: '4px 8px', width: 'calc(100% - 16px)', backgroundColor: s.isSelected ? '#4A5568' : s.isFocused ? '#2D3748' : '#1A202C', color: '#E2E8F0', ':active': { backgroundColor: '#4A5568' } }),
    multiValue: (p) => ({ ...p, backgroundColor: '#008940', borderRadius: '20px' }),
    multiValueLabel: (p) => ({ ...p, color: '#E2E8F0', fontSize: '1rem', fontWeight: 'bold', padding: '4px', paddingLeft: '8px', paddingRight: '2px' }),
    multiValueRemove: (p) => ({ ...p, color: '#A0AEC0', borderRadius: '0 20px 20px 0', ':hover': { backgroundColor: '#E53E3E', color: 'white' } }),
    input: (p) => ({ ...p, color: '#E2E8F0' }),
    menu: (p) => ({ ...p, backgroundColor: '#1A202C', borderRadius: '15px' }),
    singleValue: (p) => ({ ...p, color: '#E2E8F0' }),
  };

  // Componente customizado para mostrar apenas a primeira letra no multi-select
  const CustomMultiValueLabel = (props) => (
    <components.MultiValueLabel {...props}>
      {props.data.label[0]}
    </components.MultiValueLabel>
  );

  // Define quais componentes customizados usar, aplicando a lógica apenas para multi-select
  const customComponents = isMulti ? { MultiValueLabel: CustomMultiValueLabel } : {};

  return (
    <div className="w-full">
      <Select
        className="shadow-[10px_10px_20px_rgba(0,0,0,0.2)] rounded-[40px]"
        isMulti={isMulti}
        options={options}
        value={selecionados}
        onChange={handleSelectChange}
        isOptionDisabled={isOptionDisabled}
        placeholder={placeholder}
        closeMenuOnSelect={!isMulti}
        styles={customStyles}
        components={customComponents} // Usa os componentes customizados
      />
      {showError && <p className="text-red-400 text-center mt-2 text-sm">Você só pode selecionar no máximo {maxSelections} opções.</p>}
    </div>
  );
};

export default SelectVariaveis;
