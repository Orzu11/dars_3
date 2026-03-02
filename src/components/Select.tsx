import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type SetStateAction } from "react"
import type { CategoryType } from "../Types"
import { instance } from "../hooks"

interface SelectType {
  extraClass?: string,
  setValue?: Dispatch<SetStateAction<string | number>>,
  setLoading?: Dispatch<SetStateAction<boolean>>,
  value: string | number
}

const Select: FC<SelectType> = ({ extraClass, setValue, setLoading, value }) => {
  const [list, setList] = useState<CategoryType[]>([])

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (setValue) setValue(e.target.value)
    if (setLoading) setLoading(true)
  }

  useEffect(() => {
    instance.get("/categories").then(res => setList(res.data))
  }, [])

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`${extraClass} w-full rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-indigo-400/60`}
    >
      {list.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
    </select>
  )
}

export default Select