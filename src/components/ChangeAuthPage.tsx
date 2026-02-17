import type { FC } from "react";
import PATH from "./Path";
import { Link } from "react-router-dom";

interface ChangeAuthPageType {
  title:"Tizimga " | "Hisobingiz yo'qmi",
  
}

const ChangeAuthPage:FC<ChangeAuthPageType> = ({title}) => {
  return (
    <p className="mt-5 space-x-1 text-center text-sm text-slate-300">
      <span>{title}</span>
      <Link to={title == "Tizimga " ? PATH.home : PATH.register} className="font-medium hover:scale-[1.1] inline-block duration-300 text-indigo-300 hover:text-indigo-200">{title == "Tizimga " ? "Kirish" : "Ro'yxatdan o'tish"}</Link>
       
    </p>
  )
}

export default ChangeAuthPage