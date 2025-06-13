import { ReactElement, forwardRef } from "react"

interface ButtonInterface {
    title: string,
    size: "lg" | "md" | "sm",
    startIcon ?: ReactElement,
    endIcon ?: ReactElement,
    variant: "primary" | "secondary" | "default" | "other" | "other:hover" | "logout" | "logout:hover",
    type: "submit" | "button",
    onClick ?: () => void,
    disabled?: boolean,
}

const sizeStyles = {
    "lg": "px-8 justify-center items-center py-4 text-xl rounded-xl min-w-[]",
    "md": "flex justify-center items-center px-4 py-2 text-md rounded-lg min-w-[5vw] min-h-[4vw]",
    "sm": "px-2 justify-center items-center py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-purple-600 text-white font-bold",
    "secondary": "bg-purple-300 text-purple-600 font-bold",
    "default": "bg-slate-200 text-slate-800 font-bold",
    "other": "bg-slate-700 text-white font-bold",
    "other:hover": "bg-slate-400 text-white font-bold",
    "logout": "bg-red-600 text-white font-bold",
    "logout:hover": "bg-red-400 text-white font-bold rounded-2xl"
}

export const Button = forwardRef<HTMLButtonElement, ButtonInterface>((props, ref) => {
    return <button className={sizeStyles[props.size] + " " + variantStyles[props.variant]} type={props.type} onClick={props.onClick} ref={ref} disabled={props.disabled}>
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

export const ModernButton = ({
  title,
  onClick,
  loading,
}: {
  title: string;
  onClick: () => void;
  loading?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
  >
    <div className="relative flex items-center justify-center rounded-2xl bg-gray-900/50 px-8 py-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-900/30">
      <span className="text-lg font-medium text-white tracking-wide">
        {loading ? "Creating..." : title}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
    </div>
  </button>
);
