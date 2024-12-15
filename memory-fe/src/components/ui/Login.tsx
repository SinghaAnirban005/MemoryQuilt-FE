import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/Slice";

type LoginInputs = {
    username: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit } = useForm<LoginInputs>();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin: SubmitHandler<LoginInputs> = async(data) => {
        setLoading(true)

        try {
            const loginReq = await axios.post('http://localhost:3000/api/v1/signin', data, {
                withCredentials: true
            })
            if(!loginReq){
                setError('Error occured while trying to login')
            }
            const contentData = await axios.get('http://localhost:3000/api/v1/content', {
                withCredentials: true
            })
            
            dispatch(login(contentData.data.content))
            
            setLoading(false)
            navigate('/home')
        } catch (error) {
            setError("Server error :: Failed to login")
        }
    };

    return loading ? (
        <div>Loading...Please wait</div> 
    ): (
        <div className="flex items-center bg-red-300">
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
        <div>Don't have an account ? <span className="cursor-pointer text-blue-500" onClick={() => navigate('/signup')}>Sign Up</span></div>
        <Button title="Login" size="md" variant="secondary" type="submit" /> 
    </form>
    </div>
    )
}

