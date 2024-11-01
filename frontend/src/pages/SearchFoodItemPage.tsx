import React, { useState } from 'react';
import { fetchFoodItems } from '../api/foodItemApi';
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
                setFoodItems(response.data.filter((item: undefined) => item !== undefined));
                setTotalPages(response.totalPages || 1);
            } else {
                setFoodItems([response.data]);
                setTotalPages(1);
            }

            setPage(pageNum);

            console.log('API response:', response);
            console.log('Updated foodItems state:', response.data);
            console.log('Updated totalPages state:', response.totalPages);
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
                    foodItems.map((item) =>
                        item ? (
                            <div key={item.id} className="food-item-block">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Expiration Date:</strong> {new Date(item.expiration_date).toLocaleDateString()}</p>
                                <p><strong>Category ID:</strong> {item.category_id}</p>
                            </div>
                        ) : null
                    )
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









