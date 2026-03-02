import type { FC } from "react"
import type { ProductsType } from "../Types"

interface ProductCardType {
    item: ProductsType
}

const ProductCard: FC<ProductCardType> = ({ item }) => {
    return (
        <div className="bg-white/5 rounded-lg overflow-hidden hover:shadow-lg transition ring-1 ring-white/10 backdrop-blur">
            <img
                src={item.images?.[0] || "https://via.placeholder.com/200"}
                alt={item.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-white font-semibold truncate">{item.title}</h3>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-indigo-400 font-bold">${item.price}</span>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                        {item.category.name}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard