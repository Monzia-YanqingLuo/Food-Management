export interface FoodItem {
    id?: number;
    name: string;
    quantity: number;
    expiration_date: string;
    category_id: number;
}

export interface Category {
    id?: number;
    name: string;
    FoodItems?: FoodItem[];
}
