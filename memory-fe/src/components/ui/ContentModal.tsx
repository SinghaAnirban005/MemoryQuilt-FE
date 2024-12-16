import axios from "axios"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "./Input"
import { Button } from "./Button"
import { CloseIcon } from "../../icons/CloseIcon"

interface Modal {
    isOpen: boolean
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

    const addContent: SubmitHandler<ContentInput> = async(data) => {
        setLoading(true)
        const updatedData = {
            link: data.link,
            title: data.title,
            type: data.type[0].trim().toString()
        }

        try {
            const contentReq = await axios.post('http://localhost:3000/api/v1/content', updatedData , {
                withCredentials: true
            })
    
            if(!contentReq){
                setError('Failed to process request !!')
            }

            setLoading(false)
            props.isOpen = false
        } catch (error: any) {
            setError(error)
        }
    }

    return props.isOpen ? (
        <form onSubmit={handleSubmit(addContent)} className="flex flex-col h-[25vw] rounded-xl shadow-xl shadow-indigo-500/50 w-[40vw] justify-around items-center bg-slate-400">
            <div className="flex justify-end pr-6 w-[100%] cursor-pointer">
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
                <Button title={"Add"} size="md" variant="default" type="submit" />
            </div>
        </form>
    ) : null
}