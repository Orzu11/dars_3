import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import type { ProductsType } from "../../../Types"
import { ArrowLeft, Heart, Pencil } from "lucide-react"
import { Loading } from "../../../components"
import { Context } from "../../../context/Context"

const ProductMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { liked, toggleLike } = useContext(Context)
  const [product, setProduct] = useState<ProductsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setLoading(true)
    instance
      .get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />

  if (!product) return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-gray-400">
      Mahsulot topilmadi
    </div>
  )

  const images = product.images?.filter(Boolean) || []
  const isLiked = liked.includes(product.id)

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition mb-8 text-sm"
      >
        <ArrowLeft size={16} /> Orqaga
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="relative bg-gray-100 h-[420px]">
            <img
              src={images[activeImg] || "https://via.placeholder.com/600"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-indigo-500 scale-110" : "border-white/60"}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs bg-indigo-50 text-indigo-400 px-3 py-1 rounded-full">
                {product.category?.name}
              </span>
              <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-3 leading-snug">
                {product.title}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                {product.description}
              </p>
              <div className="text-3xl font-black text-indigo-500 mt-6">
                ${product.price}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => toggleLike(product.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-medium text-sm transition-all ${
                  isLiked
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
                }`}
              >
                <Heart size={16} className={isLiked ? "fill-red-500" : ""} />
                {isLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => navigate(`/products/${id}/update`)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-200 hover:scale-105 transition-all"
              >
                <Pencil size={16} />
                Tahrirlash
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductMore