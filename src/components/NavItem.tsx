import { NavLink } from "react-router-dom"

const NavItem = ({ path, title }: { path: string, title: string }) => {
    return (
        <NavLink className="mb-1 flex items-center gap-3 rounded-xl duration-300 px-3 py-2.5 text-sm text-slate-300 hover:text-slate-700 hover:bg-slate-300" 
            to={path}>
            <span className="h-2 w-2 rounded-full bg-slate-300"></span>
            {title}
        </NavLink>
    )
}

export default NavItem