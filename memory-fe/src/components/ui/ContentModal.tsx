import axios from "axios"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "./Input"
import { Button } from "./Button"
import { CloseIcon } from "../../icons/CloseIcon"
import { useDispatch } from "react-redux"
import { addBrains } from "../../store/Slice"
import { useNavigate } from "react-router-dom"

interface Modal {
    isOpen: boolean,
    onClose : () => void
}

type ContentInput = {
    link: string,
    title: string,
    type: "tweet" | "youtube"
}

export const ContentModal = (props: Modal) => {
    const { register, handleSubmit } = useForm<ContentInput>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addContent: SubmitHandler<ContentInput> = async(data) => {
        setLoading(true)
        const updatedData = {
            link: data.link.trim(),
            title: data.title.trim(),
            type: data.type[0].trim().toString()
        }

        try {
            const contentReq = await axios.post('https://memory-quilt-backend.onrender.com/api/v1/content', updatedData , {
                withCredentials: true
            })
    
            if(!contentReq){
                setError('Failed to process request !!')
            }
            dispatch(addBrains(contentReq.data.content))
            setLoading(false)
            props.onClose()
            navigate('/home')
        } catch (error: any) {
            setError(error)
        }
    }

    return props.isOpen ? (
        <form onSubmit={handleSubmit(addContent)} className="flex flex-col h-[25vw] rounded-xl shadow-xl shadow-indigo-500/50 w-[40vw] justify-around items-center bg-slate-300">
            {error ? <div>{error}</div> : null}
            <div className="flex justify-end pr-6 w-[100%] cursor-pointer" onClick={props.onClose}>
                <CloseIcon size="lg" />
            </div>
            
            <div className="text-lg font-bold">
                Add Content
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Input placeholder="Insert Link" type="text" size="md" 
                {...register(
                    "link", {
                        required: "Link is required"
                    }
                )} />
                <Input placeholder= "Title" type="text" size="md" {...register(
                    "title", {
                        required: "Title is required"
                    }
                )} />  
                <div className="flex items-center">
                    
                    <div className="flex items-center">
                        <label>Tweet</label>
                        <Input type="checkbox" size="sm" value="tweet"  {...register(
                            "type", {
                                required:"Type is required"
                            }
                        )} />
                    </div>
                    <div className="flex items-center">
                        <label>Youtube</label>
                        <Input type="checkbox" size="sm" value="youtube" {...register(
                            "type", {
                                required:"Type is required"
                            }
                        )} />
                    </div>
                </div>
            </div>

            <div className="mt-[2vw]">
                {loading ? <Button title={"Adding ...🤩"} size="md" variant="other:hover" type="submit" disabled={true} /> : <Button title={"Add"} size="md" variant="other" type="submit" disabled={false} />}
            </div>
        </form>
    ) : null
}