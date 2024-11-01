import axios from 'axios';
import { FoodItem  } from '../types';

const BASE_URL = 'http://localhost:3000/admin';


export const addOrUpdateFoodItem = async (foodItem: FoodItem): Promise<FoodItem> => {
    const response = await axios.put<FoodItem>(`${BASE_URL}/fooditems`, foodItem);
    return response.data;
};

export const fetchFoodItems = async (name: string = '', page: number = 1) => {
    const endpoint = name
        ? `${BASE_URL}/fooditems/${name}?page=${page}`
        : `${BASE_URL}/fooditems?page=${page}`;

    const response = await axios.get(endpoint, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    console.log('Response from API:', response.data);
    return response.data;
};


export const getFoodItemsByCategoryName = async (categoryName: string, page: number = 1) => {
    const endpoint = categoryName
        ? `${BASE_URL}/categories/${categoryName}?page=${page}`
        : `${BASE_URL}/categories?page=${page}`;

    const response = await axios.get(endpoint);
    return response.data;
};



