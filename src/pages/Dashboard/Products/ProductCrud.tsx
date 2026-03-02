import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import type { CategoryType } from "../../../Types"
import { ArrowLeft, Check, ImagePlus } from "lucide-react"
import toast from "react-hot-toast"

const ProductCrud = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState<string | number>("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    instance.get("/categories").then(res => setCategories(res.data))
  }, [])

  useEffect(() => {
    if (!isEdit) return
    setFetching(true)
    instance.get(`/products/${id}`)
      .then(res => {
        const p = res.data
        setTitle(p.title)
        setDescription(p.description)
        setPrice(String(p.price))
        setCategoryId(p.category?.id || "")
        setImageUrl(p.images?.[0] || "")
      })
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !price || !categoryId) {
      toast.error("Barcha maydonlarni to'ldiring")
      return
    }
    setLoading(true)
    const payload = {
      title,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
      images: [imageUrl || "https://via.placeholder.com/400"],
    }
    const req = isEdit
      ? instance.put(`/products/${id}`, payload)
      : instance.post("/products", payload)

    req
      .then(() => {
        toast.success(isEdit ? "Yangilandi!" : "Qo'shildi!")
        setTimeout(() => navigate("/products"), 1200)
      })
      .catch(() => toast.error("Xatolik yuz berdi"))
      .finally(() => setLoading(false))
  }

  if (fetching) return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
      <div className="flex gap-3">
        <span className="h-4 w-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-4 w-4 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-4 w-4 rounded-full bg-pink-500 animate-bounce" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition mb-8 text-sm"
      >
        <ArrowLeft size={16} /> Orqaga
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          {isEdit ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nomi *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Mahsulot nomi..."
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Tavsif</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Mahsulot haqida..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Narxi ($) *</label>
              <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Kategoriya *</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
              >
                <option value="">Tanlang...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Rasm URL</label>
            <input
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
            />
          </div>

          {imageUrl ? (
            <div className="rounded-2xl overflow-hidden h-40">
              <img
                src={imageUrl}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400" }}
              />
            </div>
          ) : (
            <div className="h-40 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 gap-2">
              <ImagePlus size={28} />
              <span className="text-xs">Rasm URL kiriting</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
            >
              Bekor
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg hover:scale-105 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Check size={16} />
              {loading ? "..." : isEdit ? "Yangilash" : "Qo'shish"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductCrud