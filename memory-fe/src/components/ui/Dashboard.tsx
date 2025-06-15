interface DashboardInterface {
    logo: string,
}

import { Twitter } from "../../icons/Twitter"
import { Youtube } from "../../icons/Youtube"
import { Button } from "./Button"
import { HomeIcon } from "../../icons/Home"
import { useNavigate } from "react-router-dom"
import { Logout } from "../../icons/Logout"
import { useDispatch } from "react-redux"
import { logout } from "../../store/Slice"
import axios from "axios"
import { useState } from "react"
import { Loader } from "./Loader"

const icons = [
    {
        icn: <Twitter width="16" height="16" />,
        title: "Tweets"
    },
    {
        icn: <Youtube size="md" />,
        title: 'Videos'
    },
    {
        icn: <HomeIcon size="md" />,
        title: 'Home'
    },
]

export const Dashboard = (props: DashboardInterface) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleLogout = async() => {
        setLoading(true)
        await axios.post('https://memory-quilt-backend.onrender.com/api/v1/logout', {}, {
            withCredentials: true
        })

        dispatch(logout())
        setLoading(false)
        navigate('/login')
    }

    if(loading){
        return <Loader color="#38bdf8" size={100} loading={loading} />
    }

    return (
        <div className="flex flex-col h-[100%] shadow-2xl justify-between items-center py-[1vw] shadow-blue-500/50">
            <div className="flex flex-col items-center py-2">
                <div className="flex items-center">
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
            <div className="flex w-[100%] justify-center">
                <Button title="Logout" size="md" startIcon={<Logout size="md" />} variant="logout" type="button" onClick={handleLogout} />
            </div>
        </div>
    )
}