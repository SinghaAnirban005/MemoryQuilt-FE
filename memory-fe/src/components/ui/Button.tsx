import { ReactElement } from "react"

interface ButtonInterface {
    title: String,
    size: "lg" | "md" | "sm",
    startIcon ?: ReactElement,
    endIcon ?: ReactElement,
    variant: "primary" | "secondary",
    type: "submit" | "button"
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600",
}

export function Button(props: ButtonInterface){
    return <button className={sizeStyles[props.size] + " " + variantStyles[props.variant] + " " + props.type}>
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
}