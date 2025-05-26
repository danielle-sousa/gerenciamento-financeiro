import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export default function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select
        {...props}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
