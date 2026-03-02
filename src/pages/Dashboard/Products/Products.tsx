import { useEffect, useState, type Dispatch, type SetStateAction, useContext } from "react"
import type { CategoryType, ProductsType } from "../../../Types"
import { debounce, instance } from "../../../hooks"
import { useNavigate } from "react-router-dom"
import { MoreVertical, Heart } from "lucide-react"
import { Loading, FilterNotFound } from "../../../components"
import { Context } from "../../../context/Context"

interface ProductsProps {
  setProducts: Dispatch<SetStateAction<ProductsType[]>>
}

const Products = ({ setProducts }: ProductsProps) => {
  const navigate = useNavigate()
  const { liked, toggleLike } = useContext(Context)

  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [localProducts, setLocalProducts] = useState<ProductsType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const title = debounce(searchValue, 800)
  const [categoryId, setCategoryId] = useState<number | string>("")

  useEffect(() => {
    instance.get("/categories").then(res => setCategoryList(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    instance
      .get("/products", { params: { title, categoryId } })
      .then(res => { setLocalProducts(res.data); setProducts(res.data) })
      .finally(() => setLoading(false))
  }, [title, categoryId])

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-6">
          <input
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-[300px] px-6 py-3 rounded-2xl bg-white shadow-md outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            onChange={e => setCategoryId(e.target.value)}
            className="w-[300px] px-6 py-3 rounded-2xl bg-white shadow-md outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Category</option>
            {categoryList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <button
          onClick={() => navigate("/products/create")}
          className="px-8 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl hover:scale-105 transition duration-300"
        >
          Create
        </button>
      </div>

      {loading ? <Loading /> : localProducts.length === 0 ? <FilterNotFound /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {localProducts.map(item => (
            <div key={item.id} className="relative rounded-3xl overflow-hidden shadow-xl group bg-black">
              <div className="relative h-[360px]">
                <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
                <span className="absolute top-5 left-5 bg-white/20 backdrop-blur-lg text-white text-xs px-4 py-1 rounded-full">
                  {item.category?.name}
                </span>
                <div
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-5 right-14 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg cursor-pointer hover:bg-white/40 transition"
                >
                  <Heart size={18} className={liked.includes(item.id) ? "text-red-500 fill-red-500" : "text-white"} />
                </div>
                <div
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg cursor-pointer hover:bg-white/40 transition"
                >
                  <MoreVertical size={18} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-base font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${item.price}</span>
                    <span className="text-xs text-white/60">#{item.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products