interface Brains {
    size : "md" | "sm" | "lg",
    content: any[]
}

import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { ShareIcon } from "../icons/ShareIcon"
import { AddIcon } from "../icons/AddIcon"
import { useEffect } from "react"

const fontVariant = {
    "sm": "flex text-[2vw] font-bold",
    "md": "flex text-[2.5vw] font-bold",
    "lg": "flex text-[5vw] font-bold"
}


export const Brains = (props: Brains) => {

    useEffect(() => {
        console.log("Logging from brains " + props.content)
    }, [])
    return (
        <div className="flex flex-col h-[100%]">
            <div className="flex justify-between mt-[2vw] px-[2vw]">
                <span className={fontVariant[props.size]}>
                    All Notes
                </span>
                <div className="flex justify-between min-w-[22vw]">
                    <Button title={"Share Brain"} size="md" startIcon={<ShareIcon size="md" />} type="button" variant="secondary" />
                    <Button title={'Add Content'} size="md" startIcon={<AddIcon size="md" />} type="button" variant="primary"  />
                </div>
            </div>
            <ul className="flex overflow-x-auto bg-red-400 h-[100%]">
              {
                props.content.map((item) => (
                    <li>
                        <Card title={item.title} contentType={item.type} size="md" url={item.url}  />
                    </li>
                ))
              }
            </ul>
        </div>
    )
}
