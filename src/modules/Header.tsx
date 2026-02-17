import { useLocation, useNavigate } from "react-router-dom"
import { Button, Modal, PATH } from "../components"
import { useContext, useState } from "react"
import { Context } from "../context/Context"
import toast, { Toaster } from "react-hot-toast"
import { ThumbsUp } from "lucide-react"

const Header = () => {
    const { setToken } = useContext(Context)
    const [loading, setLoading] = useState<boolean>(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [logOutModal, setLogOutModal] = useState<boolean>(false)

    function logOut() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setLogOutModal(false)
            toast.success("Muvaffaqiyatli chiqib ketdingiz!")
        }, 1200)

        setTimeout(() => {
            navigate(PATH.home)
            setToken("")
        }, 1800)
    }

    return (
        <header className="bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-200 bg-white/80">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                {/* Chap qism: Orqaga qaytish va Breadcrumbs */}
                <div className="flex items-center justify-between gap-3">
                    <Button onClick={() => navigate(-1)} extraClass="!w-[40px] !flex items-center justify-center !rounded-[10px] !h-[40px]" type="button">
                        <svg className="scale-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </Button>
                    <p className="text-sm text-white text-[20px] font-semibold">
                        {location.pathname === PATH.home && "Home"}
                        {location.pathname === PATH.products && "Products"}
                        {location.pathname === PATH.category && "Category"}
                    </p>
                </div>

                {/* O'ng qism: Like va Logout */}
                <div className="flex gap-5 items-center">
                    <Button extraClass="!w-[45px] relative !h-[45px] !p-0 flex items-center justify-center" type="button">
                        <ThumbsUp size={25} />
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[12px] flex items-center justify-center">1</span>
                    </Button>
                    <Button onClick={() => setLogOutModal(true)} extraClass="!w-[100px]" type="button">Log out</Button>
                </div>
            </div>

            {/* Logout Modal */}
            <Modal open={logOutModal} onClose={() => setLogOutModal(false)}>
                <div className="p-1">
                    <h2 className="text-white text-lg font-semibold mb-2">Tizimdan chiqish</h2>
                    <p className="text-slate-400 text-sm mb-6">Haqiqatdan ham profilingizdan chiqmoqchimisiz?</p>
                    <div className="flex items-center justify-end gap-3">
                        <Button onClick={() => setLogOutModal(false)} type="button" extraClass="!w-fit px-5 !h-[38px] bg-transparent hover:bg-white/5 border border-white/10 text-white">
                            Bekor qilish
                        </Button>
                        <Button onClick={logOut} type="button" extraClass="!w-fit px-5 !h-[38px] bg-red-500 hover:bg-red-600 text-white" loading={loading}>
                            Ha, chiqish
                        </Button>
                    </div>
                </div>
            </Modal>
        </header>
    )
}

export default Header