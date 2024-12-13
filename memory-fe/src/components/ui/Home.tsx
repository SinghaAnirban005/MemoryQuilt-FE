import { Dashboard } from "./Dashboard"

export const Home = () => {
    return(
        <div className="flex justify-between w-[100%] h-[100vh]">
            <div className="w-[25%]">
                <Dashboard logo="https://i.pinimg.com/736x/7f/c6/d6/7fc6d64079f1142bc636fb622eb1576f.jpg" />
            </div>
            <div className="h-[100%]">
                pages
            </div>
        </div>
    )
}