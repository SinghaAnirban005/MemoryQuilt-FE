import { ReactElement, forwardRef } from "react"

interface ButtonInterface {
    title: string,
    size: "lg" | "md" | "sm",
    startIcon ?: ReactElement,
    endIcon ?: ReactElement,
    variant: "primary" | "secondary" | "default",
    type: "submit" | "button",
    onClick ?: () => void
}

const sizeStyles = {
    "lg": "px-8 justify-center items-center py-4 text-xl rounded-xl min-w-[]",
    "md": "flex justify-center items-center px-4 py-2 text-md rounded-lg min-w-[5vw] min-h-[4vw]",
    "sm": "px-2 justify-center items-center py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-purple-600 text-white font-bold",
    "secondary": "bg-purple-300 text-purple-600 font-bold",
    "default": "bg-slate-200 text-slate-800 font-bold"
}

export const Button = forwardRef<HTMLButtonElement, ButtonInterface>((props, ref) => {
    return <button className={sizeStyles[props.size] + " " + variantStyles[props.variant]} type={props.type} ref={ref} >
        <div className="flex items-center">
        <span className="text-xs">
            {props.startIcon}
        </span>
        <div className="pl-2 pr-2">
            {props.title}
        </div>
            {props.endIcon}
        </div>
    </button>
})