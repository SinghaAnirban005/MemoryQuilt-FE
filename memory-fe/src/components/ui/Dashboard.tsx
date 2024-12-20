interface DashboardInterface {
    logo: string,
}

import { Twitter } from "../../icons/Twitter"
import { Youtube } from "../../icons/Youtube"
import { Button } from "./Button"
import { HomeIcon } from "../../icons/Home"
import { data, useNavigate } from "react-router-dom"
import { Logout } from "../../icons/Logout"
import { useDispatch } from "react-redux"
import { logout } from "../../store/Slice"
import axios from "axios"

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
    },
]

export const Dashboard = (props: DashboardInterface) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async() => {
        await axios.post('https://memory-quilt-backend.onrender.com/api/v1/logout', {}, {
            withCredentials: true
        })

        dispatch(logout())
        navigate('/login')
    }

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
                <Button title="Logout" size="md" startIcon={<Logout size="md" onClick={handleLogout} />} variant="default" type="button" onClick={handleLogout}  />
            </ul>
        </div>
    )
}