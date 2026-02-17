import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Login, NotFound, Register } from "../pages"

const AuthRoute = () => {
    const authList = [
        {id:1, path:PATH.home, element:<Login/>},
        {id:2, path:PATH.register, element:<Register/>},
        {id:3, path:PATH.notFound, element:<NotFound/>},
    ]
    return (
        <Routes>{authList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
    )
}

export default AuthRoute