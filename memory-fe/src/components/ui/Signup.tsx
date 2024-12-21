import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

type SignUpInputs = {
    fullName: string,
    username: string;
    password: string;
    email: string
};

export function Signup() {
    const { register, handleSubmit } = useForm<SignUpInputs>();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin: SubmitHandler<SignUpInputs> = async(data) => {

        try {
            setLoading(true)
            const register = await axios.post("https://memory-quilt-backend.onrender.com/api/v1/signup", data) 
            if(!register){
                setError('Failed to register')
            }
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setError('Server error')
        }
    };

    if(loading){
        return (
            <Loader color="#38bdf8" size={150} loading={loading} />
        ) 
    }

    return (
        <div className="flex bg-blue-300 justify-center items-center h-[100vh] w-[100%]">
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col items-center justify-center gap-4 bg-red-300 w-[45%] h-[60%] rounded-xl">
                {error ? <div>{error}</div> : null}
            <div className="text-2xl font-bold mb-2">
                Sign Up
            </div>
            <div>
                <Input
                    type="text"
                    placeholder="Enter Full Name"
                    size="md" 
                    {...register("fullName", { required: "FullName is required" })}
                />
            </div>
            <div>
                <Input
                    type="email"
                    placeholder="Enter email"
                    size="md" 
                    {...register("email", { required: "email is required" })}
                />
            </div>
            <div>
                <Input
                    type="text"
                    placeholder="Set username"
                    size="md" 
                    {...register("username", { required: "Username is required" })}
                />
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Set password"
                    size="md"
                    {...register("password", { required: "Password is required" })}    
                />
            </div>
            <div>Already Signed Up ? <span className="cursor-pointer text-blue-500 underline" onClick={() => navigate('/login')}>Login</span></div>
            <Button title="Register" size="md" variant="secondary" type="submit" />
        </form>
        </div>
    );
}

