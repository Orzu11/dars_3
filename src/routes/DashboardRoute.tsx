import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Category, Home, NotFound, ProductCrud, ProductMore, Products } from "../pages"
import { Header, Sitebar } from "../modules"

const DashboardRoute = () => {
    const dashboardList = [
        { id: 1, path: PATH.home, element: <Home /> },
        { id: 2, path: PATH.products, element: <Products /> },
        { id: 3, path: PATH.category, element: <Category /> },
        { id: 4, path: PATH.notFound, element: <NotFound /> },
        { id: 5, path: PATH.productsCreate, element: <ProductCrud /> },
        { id: 6, path: PATH.productsMore, element: <ProductMore /> },
        { id: 7, path: PATH.productsUpdate, element: <ProductCrud /> },
    ]

    return (
        <div className="flex">
            <Sitebar />
            <div className="w-[78%] h-screen overflow-y-auto">
                <Header />
                <Routes>
                    {dashboardList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}
                </Routes>
            </div>
        </div>
    )
}

export default DashboardRoute