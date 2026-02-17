import { useState, type SubmitEvent } from "react";
import { AuthFormItem, Button, ChangeAuthPage, SiteLogo, PATH } from "../../components";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    function handleRegisterSubmit(evt: SubmitEvent<HTMLFormElement>) {
        setLoading(true)
        evt.preventDefault()
        const data = {
            email: evt.target.email.value,
            password: evt.target.password.value,
            name: `${evt.target.firstName.value} ${evt.target.lastName.value}`,
            role: "admin",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaZnF8ElwCzCgHGTNVnaElToLnw3zE4AgEVQ&s"
        }
        axios.post("https://api.escuelajs.co/api/v1/users/", data).then(res => {
            toast.success(`Muvaffaqiyatli ${res.data.name} qo'shildingiz `);
            setTimeout(() => {
                navigate(PATH.home);
            }, 1500);
        }).catch(() => toast.error("Xatolik bor!")).finally(() => setLoading(false));
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <SiteLogo />
                        <h1 className="text-2xl font-semibold tracking-tight">Ro'yxatdan o'tish</h1>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur">
                        <form onSubmit={handleRegisterSubmit} autoComplete="off">
                            <AuthFormItem label="Ism" name="firstName" placeholder="Ismingizni kiriting" type="text" />
                            <AuthFormItem labelClass="!mt-4" label="Familiya" name="lastName" placeholder="Familiyangizni kiriting" type="text" />
                            <AuthFormItem labelClass="!mt-4" label="password" name="password" placeholder="*********" type="password" />
                            <AuthFormItem labelClass="!mt-4" label="email" name="email" placeholder="example@gmail.com" type="email" />
                            <Button extraClass="!h-[44px] !mt-3 flex !items-center !justify-center" type="submit">
                                {loading ? <img className="scale-[1.2]" alt="Loading" width={30} height={30} /> : "Hisob yaratish"}
                            </Button>
                        </form>
                    </div>
                    <ChangeAuthPage title="Tizimga " />
                </div>
            </div>
        </div>
    )
}

export default Register;
