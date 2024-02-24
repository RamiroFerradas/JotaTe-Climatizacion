import React from "react";
import { capitalizeFirstLetter } from "../utilities/capitalizeFirstLetter";
import { Controller } from "react-hook-form";

interface InputFormProps {
  type: "text" | "email" | "tel" | "textarea" | "number"; // Tipos de campo de entrada admitidos
  name: string;
  label?: string;
  control: any;
  rules?: object;
  className?: string;
  errors: any;
  placeholder?: string;
  required?: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  type,
  name,
  label,
  control,
  rules,
  className,
  errors,
  placeholder,
  required,
}) => {
  const updatedRules = required
    ? { ...rules, required: "Campo requerido" }
    : rules;

  return (
    <div className="w-full">
      {label && <label className="text-green-principal">{label}:</label>}{" "}
      <Controller
        name={name}
        control={control}
        rules={updatedRules}
        render={({ field }) =>
          type === "textarea" ? (
            <textarea
              {...field}
              className={className}
              placeholder={placeholder ?? capitalizeFirstLetter(name)}
              value={field.value ?? ""}
            />
          ) : (
            <input
              {...field}
              type={type}
              className={className}
              placeholder={placeholder ?? capitalizeFirstLetter(name)}
              value={field.value ?? ""}
            />
          )
        }
      />
      <p className={errors[name] ? "text-red-500 text-sm" : ""}>
        {errors[name] && errors[name].message}
      </p>
    </div>
  );
};

export default InputForm;
