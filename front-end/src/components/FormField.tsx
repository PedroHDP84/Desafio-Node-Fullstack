import { ReactNode } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type SelectOption = { label: string; value: string };

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  register?: UseFormRegister<T>;
  fieldId: Path<T>;
  placeholder: string;
  otherRegisterValidations?: RegisterOptions<T, Path<T>>;
  isRequired?: boolean;
  label: string;
  type?: React.HTMLInputTypeAttribute | "select";
  options?: SelectOption[];
  multiple?: boolean;
};

export function FormField<T extends FieldValues>({
  errors,
  register,
  fieldId,
  placeholder,
  otherRegisterValidations,
  isRequired,
  label,
  type,
  options,
  multiple,
}: Props<T>) {
  const validationProps = register
    ? register(fieldId, {
        ...(isRequired && { required: "Campo vazio" }),
        ...otherRegisterValidations,
      })
    : {};

  const commonProps = {
    id: fieldId,
    multiple,
    ...validationProps,
    className:
      "bg-[#333B49] mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white",
  };

  return (
    <div className={`mb-4 ${errors[fieldId] ? "has-error" : ""}`}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-normal text-white mb-2"
      >
        {`${label}${isRequired ? "*" : ""}`}
      </label>
      {type == "select" ? (
        <select {...commonProps}>
          <option key={"hiddenOptionRandom654X"} value="" disabled selected>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...commonProps} placeholder={placeholder} />
      )}

      {errors[fieldId] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[fieldId]?.message as ReactNode}
        </p>
      )}
    </div>
  );
}
