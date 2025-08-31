import type { UseFormRegisterReturn } from "react-hook-form";
import Chevron from "../../assets/chevron";
import { useState } from "react";

type SelectProps = {
  register: UseFormRegisterReturn<string>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label: string;
};

const Select = ({ register, onChange, options, label }: SelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
      <Chevron
        className={
          "transition-all absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" +
          (open ? " -rotate-90" : " rotate-90")
        }
      />
      <select
        className="w-80 appearance-none text-xl p-2 border-2 border-text outline-0 rounded-lg bg-white"
        {...register}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
