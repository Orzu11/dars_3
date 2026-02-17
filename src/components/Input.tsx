import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react"

interface InputType {
    name: string,
    type: "password" | "text" | "email",
    placeholder: string,
    extraClass?: string,
    setValue?: Dispatch<SetStateAction<string>>,
    setLoading?: Dispatch<SetStateAction<boolean>>
}

const Input: FC<InputType> = ({ name, type, placeholder, extraClass, setValue, setLoading }) => {

    function handleSearch(evt: ChangeEvent<HTMLInputElement>) {
        if (setValue) setValue(evt.target.value.toLowerCase())
        if (setLoading) setLoading(true)
    }

    return (
        <input 
            onChange={handleSearch} 
            autoComplete="off" 
            name={name} 
            type={type} 
            placeholder={placeholder} 
            className={`${extraClass} w-full rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-indigo-400/60`} 
        />
    )
}

export default Input