import { ChangeEvent } from "react";

interface Props {
  label: string;
  type: string;
  id: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoComplete?: string;
  placeholder?: string;
}

const TextInput = ({
  label,
  type,
  id,
  name,
  onChange,
  value,
  autoComplete,
  placeholder,
}: Props) => {
  return (
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
