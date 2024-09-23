import { FormControl, FormLabel } from '@chakra-ui/react';
import ReactSelect from 'react-select';

interface SelectSearchProps {
  id: string;
  label?: string;
  options: { value: number | string; label: string }[];
  isLoading?: boolean;
  placeholder?: string;
  value: number | string | null; // El valor actual seleccionado
  onChange: (value: number | string) => void; // Handler para cambios
}

const SelectSearch: React.FC<SelectSearchProps> = ({
  id,
  label,
  options,
  isLoading = false,
  placeholder = 'Selecciona una opción',
  value,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ReactSelect
        id={id}
        name={id}
        isLoading={isLoading}
        options={options}
        placeholder={placeholder}
        value={options.find((option) => option.value === value)} // Busca el valor en las opciones
        onChange={(selectedOption) => {
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
      />
    </FormControl>
  );
};

export default SelectSearch;
