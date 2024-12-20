import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { CloseIcon } from "../../icons/CloseIcon"
import { useDispatch, useSelector } from "react-redux"
import { link } from "../../store/Slice"
import { RootState } from "../../store/Store"

interface Modal {
    isOpen: boolean,
    onClose : () => void
}

export const ShareModal = (props: Modal) => {
    const [error, setError] = useState('')
    const [shareLink, setShareLink] = useState('')
    const dispatch = useDispatch()
    const sharableLink = useSelector((state : RootState) => state.link)


    useEffect(() => {
        if(shareLink !== ''){
            setShareLink(`https://secondbrain-blond-chi.vercel.app/memory/${sharableLink}`)
        }
        else{
            setShareLink('')
        }
    }, [sharableLink])

    const handleShare = async() => {
        try {
            const shareReq = await axios.post('https://memory-quilt-backend.onrender.com/api/v1/memory/share', {
                share: true
            }, {
                withCredentials: true
            })

            setShareLink(`https://secondbrain-d98e.onrender.com/api/v1/memory/${shareReq.data.hash}`)
            dispatch(link(shareReq.data.hash))
        } catch (error:any) {
            setError(error)
        }
    }

    const deleteShare = async() => {
        try {
            await axios.post('https://memory-quilt-backend.onrender.com/api/v1/memory/share', {
                share: false
            }, {
                withCredentials: true
            })

            setShareLink('')
            dispatch(link(''))
        } catch (error: any) {
            setError(error)
        }
    }


    return props.isOpen ? (
        <form className="flex flex-col h-[25vw] rounded-xl shadow-xl shadow-indigo-500/50 w-[40vw] justify-around items-center bg-slate-300">
            {error ? <div>{error}</div> : null}
            <div className="flex justify-end pr-6 w-[100%] cursor-pointer" onClick={props.onClose}>
                <CloseIcon size="lg" />
            </div>
            
            <div className="text-xl font-bold">
                Do you want to share your Brains ?
            </div>
            <div className="w-[20vw]">
                <input type="text" placeholder="Your sharable Link" value={shareLink} readOnly={true} className="w-[20vw] h-[4vw] rounded-xl" />
            </div>
            <div className="flex justify-between w-[10vw]">
                <Button title="No" size="sm" variant="other:hover" type="button" onClick={deleteShare} />
                <Button title="Yes" size="sm" variant="other:hover" type="button" onClick={handleShare} />
            </div>

        </form>
    ) : null
}