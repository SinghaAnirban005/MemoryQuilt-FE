import React, { forwardRef } from "react";

interface InputInterface {
    placeholder?: string;
    type: "text" | "password" | "checkbox" | "email";
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    size: "sm" | "md" | "lg";
}

const InputVariants = {
    sm: "rounded-sm w-50 h-8",
    md: "rounded-md w-75 h-10",
    lg: "rounded-lg w-80 h-20",
};

export const Input = forwardRef<HTMLInputElement, InputInterface>(
    ({ type, placeholder, handleChange, size }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                className={InputVariants[size]}
            />
        );
    }
);
