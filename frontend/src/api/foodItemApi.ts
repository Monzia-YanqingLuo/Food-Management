import axios from 'axios';
import { FoodItem  } from '../types';

const BASE_URL = 'http://localhost:3000/admin';


export const addOrUpdateFoodItem = async (foodItem: FoodItem): Promise<FoodItem> => {
    const response = await axios.put<FoodItem>(`${BASE_URL}/fooditems`, foodItem);
    return response.data;
};

export const getFoodItemByName = async (name: string): Promise<FoodItem | null> => {
    try {
        const response = await axios.get<FoodItem>(`${BASE_URL}/fooditems/${name}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            return null;
        } else {
            console.error('Error fetching food item by name:', error);
            throw error;
        }
    }
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

export const deleteFoodItemById = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/fooditems/${id}`);
};


export const getFoodItemsByCategoryName = async (categoryName: string, page: number = 1) => {
    const endpoint = categoryName
        ? `${BASE_URL}/categories/${categoryName}?page=${page}`
        : `${BASE_URL}/categories?page=${page}`;

    const response = await axios.get(endpoint);
    return response.data;
};



