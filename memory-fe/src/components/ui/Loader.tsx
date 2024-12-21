import { HashLoader } from "react-spinners"

interface LoaderInt {
    loading: boolean,
    color: string,
    size: number
}

export const Loader = (props: LoaderInt) => {
    return (
        <div className="sweet-loading w-[100%] h-[100vh] bg-slate-300 flex justify-center items-center">
            <HashLoader
                loading={props.loading}
                color={props.color}
                size={props.size}
            />
        </div>
    )
}