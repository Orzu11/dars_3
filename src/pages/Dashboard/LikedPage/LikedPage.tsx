import { useContext } from "react"
import { Heart, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FilterNotFound } from "../../../components"
import { Context } from "../../../context/Context"

interface LikedPageProps {
  products: any[]
}

const LikedPage = ({ products }: LikedPageProps) => {
  const navigate = useNavigate()
  const { liked, toggleLike } = useContext(Context)
  const likedProducts = products.filter(p => liked.includes(p.id))

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Heart size={20} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Liked mahsulotlar</h1>
            <p className="text-sm text-gray-400">{likedProducts.length} ta</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl hover:scale-105 transition duration-300"
        >
          Mahsulotlar
        </button>
      </div>

      {likedProducts.length === 0 ? <FilterNotFound /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {likedProducts.map(item => (
            <div key={item.id} className="relative rounded-3xl overflow-hidden shadow-xl group bg-black">
              <div className="relative h-[360px]">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
                <span className="absolute top-5 left-5 bg-white/20 backdrop-blur-lg text-white text-xs px-4 py-1 rounded-full">
                  {item.category?.name}
                </span>
                <div
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg cursor-pointer hover:bg-red-500/60 transition"
                >
                  <Trash2 size={16} className="text-red-400" />
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

export default LikedPage