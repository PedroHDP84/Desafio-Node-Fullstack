import { useEffect, useState } from "react";

type Props = {
  handleValues: (values: string[]) => void;
  placeholder: string;
  iconAriaLabel: string;
  id: string;
  label: string;
};

export function MultiInput({
  handleValues,
  placeholder,
  iconAriaLabel,
  id,
  label,
}: Props) {
  const [values, setValues] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    handleValues(values);
  }, [values]);

  function handleAddValue() {
    if (!currentValue) return;
    if (values.includes(currentValue)) return;
    setValues((oldValues) => [...oldValues, currentValue]);
    setCurrentValue("");
  }

  function removeValue(value: string) {
    const valuesWithoutRemoved = values.filter((e) => e !== value);
    setValues(valuesWithoutRemoved);
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm  text-white mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          className=" bg-[#333B49] block w-full pl-3 pr-10 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border focus:border-indigo-500 sm:text-sm text-white"
        />
        <button
          type="button"
          onClick={handleAddValue}
          aria-label={iconAriaLabel}
          className=" bg-[#051D41] text-white pb-1 rounded h-10 w-12"
        >
          +
        </button>
      </div>

      <div className="flex mt-4 gap-4 flex-wrap max-w-full">
        {values.map((value) => (
          <div
            key={value}
            className="flex items-center bg-blue-200 text-gray-900 rounded px-2 py-1"
          >
            <span>{value}</span>
            <button
              type="button"
              onClick={() => removeValue(value)}
              aria-label="Remove"
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
