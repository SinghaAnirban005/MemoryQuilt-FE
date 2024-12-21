import { Dashboard } from "./Dashboard"
import { Brains } from "../../pages/Brains"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/Store"
import { Loader } from "./Loader"

export const Home = () => {
    const [content, setContent] = useState([])
    const storeData = useSelector((state: RootState) => state.userBrains)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setContent(storeData)
        setLoading(false)
    }, [content, storeData])

    useEffect(() => {
        setLoading(true)
        setContent(storeData)
        setLoading(false)
    }, [])


    if(loading){
        return <Loader color="#38bdf8" size={150} loading={loading} />
    }
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