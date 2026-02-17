import { PATH } from "../components"
import NavItem from "../components/NavItem"

const SiteBar = () => {
    return (
        <div className="w-[22%] bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 h-screen border-r border-slate-300 overflow-y-auto">
            <div className="p-5">
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white bg-linear-to-br from-indigo-600 to-sky-500">
                        <span className="text-xl font-sans">A</span>
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold">Admin Panel</div>
                        <div className="text-xs text-slate-500">Dashboard</div>
                    </div>
                </div>
            </div>

            <nav className="px-3 pb-5">
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Menu
                </div>
                <NavItem path={PATH.home} title="Home" />
                <NavItem path={PATH.products} title="Products" />
                <NavItem path={PATH.category} title="Category" />
            </nav>
        </div>
    )
}

export default SiteBar