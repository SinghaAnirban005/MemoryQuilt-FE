import React, { forwardRef,  useState } from "react";

interface InputInterface {
    placeholder?: string;
    type: "text" | "password" | "checkbox" | "email";
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    size: "sm" | "md" | "lg";
    label ?: string,
    value ?: string,
    className?: string
}

const InputVariants = {
    sm: "rounded-sm w-[8vw] h-8 border-2 border-blue-800",
    md: "rounded-md w-[30vw] h-10 border-2 border-blue-800",
    lg: "rounded-lg w-[40vw] h-20 border-2 border-blue-800",
};

export const Input = forwardRef<HTMLInputElement, InputInterface>(
    ({ type, placeholder, handleChange, size,label, value, className, ...rest }, ref) => {
        return (
            <div className="flex flex-col">
                {label ? <div className="flex text-lg font-bold">{label}</div>: null}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={InputVariants[size] + ` ${className}`}
                    value={value}
                    {...rest}
                />
            </div>
        );
    }
);


export const ModernInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group">
      <div
        className={`
        relative overflow-hidden rounded-2xl backdrop-blur-md
        ${focused
            ? "bg-white/10 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
            : "bg-white/5 border-2 border-white/10 hover:border-white/20"
          }
        transition-all duration-300 ease-out
      `}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-6 py-4 bg-transparent text-white placeholder-white/50 outline-none text-lg font-light tracking-wide"
        />
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0
          ${focused ? "opacity-100" : "group-hover:opacity-50"}
          transition-opacity duration-300 pointer-events-none
        `}
        />
      </div>
      {error && (
        <div className="mt-2 text-red-400 text-sm font-light animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
};