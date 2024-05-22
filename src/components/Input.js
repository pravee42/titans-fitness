import React from 'react';

function Input({ size, placeholder, value, onChange, className, label, type }) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        {type === 'date' ? (
          <input
            id={label}
            type="date"
            value={value}
            onChange={onChange}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
          />
        ) : (
          <input
            id={label}
            type="text"
            
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
          />
        )}
      </div>
    </div>
  );
}

export default Input;
