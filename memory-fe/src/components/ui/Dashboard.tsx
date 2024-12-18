interface DashboardInterface {
    logo: string,
}

import { Twitter } from "../../icons/Twitter"
import { Youtube } from "../../icons/Youtube"
import { Button } from "./Button"
import { HomeIcon } from "../../icons/Home"
import { useNavigate } from "react-router-dom"

const icons = [
    {
        icn: <Twitter width="20" height="20" />,
        title: "Tweets"
    },
    {
        icn: <Youtube size="md" />,
        title: 'Videos'
    },
    {
        icn: <HomeIcon size="md" />,
        title: 'Home'
    }
]

export const Dashboard = (props: DashboardInterface) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col h-[100%] shadow-2xl shadow-blue-500/50">
            <div className="flex items-center justify-start py-2">
                <img src={props.logo} alt="logo" className="w-[8vw] h-[4vw] rounded-2xl" />
                <span className="text-[2vw] font-bold">Second Brain</span>
            </div>
            <ul className="flex flex-col items-center gap-2 justify-center pt-6">
                {
                    icons.map((it, index) => (
                        <li key={index}>
                            <Button title={it.title} size="md" startIcon={it.icn} variant="default" type="button" onClick={(() => navigate(`/${it.title.toLowerCase()}`))} />
                        </li> 
                    ))
                }
            </ul>
        </div>
    )
}