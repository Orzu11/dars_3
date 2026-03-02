import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Category, Home, NotFound, ProductCrud, ProductMore, Products, LikedPage } from "../pages"
import { Header, Sitebar } from "../modules"
import type { ProductsType } from "../Types"

const DashboardRoute = () => {
  const [products, setProducts] = useState<ProductsType[]>([])

  const dashboardList = [
    { id: 1, path: PATH.home,           element: <Home /> },
    { id: 2, path: PATH.products,       element: <Products setProducts={setProducts} /> },
    { id: 3, path: PATH.category,       element: <Category /> },
    { id: 4, path: PATH.productsCreate, element: <ProductCrud /> },
    { id: 5, path: PATH.productsMore,   element: <ProductMore /> },
    { id: 6, path: PATH.productsUpdate, element: <ProductCrud /> },
    { id: 7, path: PATH.liked,          element: <LikedPage products={products} /> },
    { id: 8, path: PATH.notFound,       element: <NotFound /> },
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