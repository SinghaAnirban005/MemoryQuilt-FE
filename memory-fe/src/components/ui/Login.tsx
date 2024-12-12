import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginInputs = {
    username: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit } = useForm<LoginInputs>();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin: SubmitHandler<LoginInputs> = async(data) => {
        setLoading(true)

        try {
            const login = await axios.post('http://localhost:3000/api/v1/signin', data)
            if(!login){
                setError('Error occured while trying to login')
            }
            setLoading(false)
            navigate('/home')
        } catch (error) {
            setError("Server error :: Failed to login")
        }
    };

    return loading ? (
        <div>Loading...Please wait</div> 
    ): (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
        
            <div>
                <Input
                    type="text"
                    placeholder="Enter username"
                    size="md" 
                    {...register("username", { required: "Username is required" })}
                />
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Enter password"
                    size="md"
                    {...register("password", { required: "Password is required" })}    
                />
            </div>
            <div>Don't have an account ? <span onClick={() => navigate('/signup')}>Sign Up</span></div>
            <Button title="Login" size="md" variant="secondary" type="submit" /> 
        </form>
    )
}

