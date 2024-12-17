import { Dashboard } from "./Dashboard"
import { Tweets } from "../../pages/Tweets"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/Store"

export const Tweet = () => {
    const [content, setContent] = useState([])
    const storeData = useSelector((state: RootState) => state.userBrains.filter((x : any) => x.type === "tweet"))

    useEffect(() => {
        setContent(storeData)
    }, [])

    return(
        <div className="flex justify-between w-[100%] h-[100vh]">
            <div className="w-[25%]">
                <Dashboard logo="https://i.pinimg.com/736x/7f/c6/d6/7fc6d64079f1142bc636fb622eb1576f.jpg" />
            </div>
            <div className="h-[100%] w-[75%]">
                <Tweets size="md" content={content} />
            </div>
        </div>
    )
}