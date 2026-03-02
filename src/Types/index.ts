export interface CategoryType {
    id: number;
    name: string;
    image: string;
}

export interface ProductsType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: CategoryType;
}
