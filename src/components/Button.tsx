import type { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonType {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    extraClass?: string,
    type?: "button" | "submit",
    loading?: boolean
}

const Button: FC<ButtonType> = ({ onClick, children, extraClass, type, loading }) => {
    return (
        <button onClick={onClick} type={type} disabled={loading} className={`${extraClass} w-full rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}>
            {children}
        </button>
    )
}

export default Button;
