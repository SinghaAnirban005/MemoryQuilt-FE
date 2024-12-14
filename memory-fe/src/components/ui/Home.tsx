import { Dashboard } from "./Dashboard"
import { Brains } from "../../pages/Brains"
import axios from "axios"
import { useEffect, useState } from "react"

export const Home = () => {

    const [content, setContent] = useState([])

    useEffect(() => {
        (async() => {
            const data = await axios.get('http://localhost:3000/api/v1/content', {
                withCredentials: true
            })
            console.log(data.data.content)
            setContent(data.data.content)
            //@ts-ignore
            console.log(content)
        })()
    }, [])

    useEffect(() => {
        console.log('Updated content:', content); // Logs content whenever it updates
    }, [content]);

    return(
        <div className="flex justify-between w-[100%] h-[100vh]">
            <div className="w-[25%]">
                <Dashboard logo="https://i.pinimg.com/736x/7f/c6/d6/7fc6d64079f1142bc636fb622eb1576f.jpg" />
            </div>
            <div className="h-[100%] w-[75%]">
                <Brains size="md" content={content} />
            </div>
        </div>
    )
}