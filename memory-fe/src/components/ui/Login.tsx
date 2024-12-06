import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";

type LoginInputs = {
    username: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit } = useForm<LoginInputs>();

    const handleLogin: SubmitHandler<LoginInputs> = (data) => {
        console.log("Form Data:", data);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Username Changed:", event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Password Changed:", event.target.value);
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
        
            <div>
                <Input
                    type="text"
                    placeholder="Enter username"
                    size="md"
                    handleChange={handleUsernameChange} 
                    {...register("username", { required: "Username is required" })}
                />
            </div>

      
            <div>
                <Input
                    type="password"
                    placeholder="Enter password"
                    size="md"
                    handleChange={handlePasswordChange}
                    {...register("password", { required: "Password is required" })}
                />
            </div>

            <Button title="Login" size="md" variant="secondary" type="submit" />
        </form>
    );
}
