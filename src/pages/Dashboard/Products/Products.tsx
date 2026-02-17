import { useEffect, useState } from "react"
import { Button, FilterNotFound, Input, Loading, PATH, ProductCard, Select } from "../../../components"
import type { CategoryType, ProductsType } from "../../../@types/index"
import { debounce, instance } from "../../../hooks"
import { useNavigate } from "react-router-dom"

const Products = () => {
    const navigate = useNavigate()
    const [categoryList, setCategoryList] = useState<CategoryType[]>([])
    const [products, setProducts] = useState<ProductsType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [searchValue, setSearchValue] = useState<string>("")
    const title = debounce(searchValue, 800)
    const [categoryId, setCategoryId] = useState<number | string>("")

    useEffect(() => {
        instance.get("/categories").then(res => setCategoryList(res.data))
    }, [])

    useEffect(() => {
        instance.get("/products", { params: { title, categoryId } }).then(res => {
            setProducts(res.data)
            setLoading(false)
        }).finally(() => setLoading(false))
    }, [title, categoryId])

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-7.5">
                    <Input setLoading={setLoading} setValue={setSearchValue} extraClass="!bg-slate-200 !py-3.5 !text-black !w-[300px]" name="search" placeholder="Qidirish" type="text" />
                    <Select setLoading={setLoading} setValue={setCategoryId} list={categoryList} extraClass="!bg-slate-200 !text-black !w-[300px]" />
                </div>
                <Button onClick={() => navigate(PATH.productsCreate)} extraClass="!w-[100px]" type="button">Create</Button>
            </div>
            {loading ? <Loading /> : (
                <ul className="flex justify-between gap-5 flex-wrap mt-5">
                    {products.length ? products.map(item => (
                        <ProductCard key={item.id} item={item} />
                    )) : <FilterNotFound />}
                </ul>
            )}
        </div>
    )
}

export default Products