import React, { useState} from 'react';
import { fetchFoodItems, deleteFoodItemById } from '../api/foodItemApi';
import { FoodItem } from '../types';
import './SearchFoodItemStyles.css';

const SearchFoodItemPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const loadFoodItems = async (pageNum: number) => {
        try {
            const response = await fetchFoodItems(name.trim(), pageNum);

            if (Array.isArray(response.data)) {
                setFoodItems(response.data);
                setTotalPages(response.totalPages ?? 1);
            } else if (response.data) {
                setFoodItems([response.data]);
                setTotalPages(1);
            } else {
                setFoodItems([]);
                setTotalPages(1);
            }

            setPage(pageNum);
            console.log('API response:', response);
        } catch (error) {
            console.error('Error fetching FoodItems:', error);
            alert('No food items found or an error occurred');
            setFoodItems([]);
        }
    };

    const handleSearch = () => {
        loadFoodItems(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            loadFoodItems(newPage);
        }
    };

    const handleDelete = async (id: number | undefined, name: string) => {
        if (id === undefined) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
        if (confirmDelete) {
            try {
                await deleteFoodItemById(id);
                alert(`Food item "${name}" deleted successfully!`);
                loadFoodItems(page);
            } catch (error) {
                console.error('Error deleting food item:', error);
                alert('Failed to delete food item');
            }
        }
    };


    return (
        <div className="search-container">
            <h2>Search Food Item</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter food item name or leave blank to list all"
            />
            <button onClick={handleSearch}>Search</button>

            <div className="results">
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <div key={item.id} className="food-item-block">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Expiration Date:</strong> {new Date(item.expiration_date).toLocaleDateString()}</p>
                            <p><strong>Category ID:</strong> {item.category_id}</p>
                            <button onClick={() => handleDelete(item.id, item.name)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No food items found.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Back</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={page === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default SearchFoodItemPage;

