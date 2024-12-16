import React, { forwardRef } from "react";

interface InputInterface {
    placeholder?: string;
    type: "text" | "password" | "checkbox" | "email";
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    size: "sm" | "md" | "lg";
    label ?: string,
    value ?: string
}

const InputVariants = {
    sm: "rounded-sm w-[8vw] h-8 border-2 border-blue-800",
    md: "rounded-md w-[30vw] h-10 border-2 border-blue-800",
    lg: "rounded-lg w-[40vw] h-20 border-2 border-blue-800",
};

export const Input = forwardRef<HTMLInputElement, InputInterface>(
    ({ type, placeholder, handleChange, size,label, value, ...rest }, ref) => {
        return (
            <div className="flex flex-col">
                {label ? <div className="flex text-lg font-bold">{label}</div>: null}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={InputVariants[size]}
                    value={value}
                    {...rest}
                />
            </div>
        );
    }
);
