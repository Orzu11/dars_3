import { useEffect, useState } from "react";
import type { CategoryType } from "../../Types";
import { instance } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, X, Check, MoreVertical } from "lucide-react";
import { Loading, FilterNotFound } from "../../components";
import toast from "react-hot-toast";

const empty = { name: "", image: "" };

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<CategoryType | null>(null);
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const fetchData = () => {
    setLoading(true);
    instance.get("/categories").then(r => setCategories(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openCreate = () => { setEditItem(null); setForm(empty); setModal(true); };
  const openEdit = (c: CategoryType) => { setEditItem(c); setForm({ name: c.name, image: c.image || "" }); setModal(true); setOpenMenu(null); };
  const closeModal = () => { setModal(false); setEditItem(null); setForm(empty); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    const payload = { name: form.name, image: form.image || `https://api.lorem.space/image/fashion?w=640&h=480&r=${Math.random()}` };
    const req = editItem
      ? instance.put(`/categories/${editItem.id}`, payload)
      : instance.post("/categories", payload);
    req
      .then(() => { toast.success(editItem ? "Yangilandi" : "Qo'shildi"); fetchData(); closeModal(); })
      .catch(() => toast.error("Xatolik"))
      .finally(() => setSubmitting(false));
  };

  const handleDelete = (id: number) => {
    instance.delete(`/categories/${id}`)
      .then((res) => {
        if (res.data === true || res.status === 200) {
          toast.success("O'chirildi");
          setCategories(p => p.filter(c => c.id !== id));
          setDeleteId(null);
        } else {
          toast.error("Bu kategoriyani o'chirib bo'lmaydi");
          setDeleteId(null);
        }
      })
      .catch((err) => {
        const msg = err?.response?.status === 400
          ? "Bu kategoriyani o'chirib bo'lmaydi"
          : "Xatolik yuz berdi";
        toast.error(msg);
        setDeleteId(null);
      });
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-10" onClick={() => setOpenMenu(null)}>

      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-6">
          <input
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-[300px] px-6 py-3 rounded-2xl bg-white shadow-md outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          onClick={openCreate}
          className="px-8 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl hover:scale-105 transition duration-300"
        >
          Create
        </button>
      </div>

      {loading ? <Loading /> : filtered.length === 0 ? <FilterNotFound /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map(cat => (
            <div key={cat.id} className="relative rounded-3xl overflow-hidden shadow-xl group bg-black">
              <div className="relative h-[360px]">
                <img
                  src={cat.image || "https://via.placeholder.com/400"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

                <div
                  onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === cat.id ? null : cat.id); }}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg cursor-pointer hover:bg-white/40 transition"
                >
                  <MoreVertical size={18} className="text-white" />
                </div>

                {openMenu === cat.id && (
                  <div className="absolute top-16 right-5 bg-white rounded-2xl shadow-2xl overflow-hidden z-10 w-36" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => openEdit(cat)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition"
                    >
                      <Pencil size={14} /> Tahrirlash
                    </button>
                    <button
                      onClick={() => { setDeleteId(cat.id); setOpenMenu(null); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={14} /> O'chirish
                    </button>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-base font-semibold truncate">{cat.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-white/60">#{cat.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={closeModal} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6">{editItem ? "Tahrirlash" : "Yangi kategoriya"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {([["Nomi *", "name", "Kategoriya nomi...", true], ["Rasm URL", "image", "https://...", false]] as const).map(([label, key, placeholder, required]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
              ))}
              {form.image && (
                <div className="rounded-xl overflow-hidden h-32">
                  <img src={form.image} alt="preview" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/200"; }} />
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">Bekor</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow hover:scale-105 transition disabled:opacity-60 flex items-center justify-center gap-2">
                  <Check size={16} />{submitting ? "..." : editItem ? "Yangilash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">O'chirishni tasdiqlang</h2>
            <p className="text-sm text-gray-500 mb-6">Bu amalni ortga qaytarib bo'lmaydi.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">Bekor</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition">O'chirish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;