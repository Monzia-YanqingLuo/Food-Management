import React, { useState } from 'react';
import { getFoodItemsByCategoryName } from '../api/foodItemApi';
import { Category } from '../types';
import './SearchByCategoryStyles.css';

const SearchByCategoryPage: React.FC = () => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchCategories = async (pageNum: number) => {
        try {
            const response = await getFoodItemsByCategoryName(categoryName, pageNum);

            if (Array.isArray(response.data)) {
                setCategories(response.data);
                setTotalPages(response.totalPages);
            } else {
                setCategories([response]);
                setTotalPages(1);
            }

            setPage(pageNum);
            console.log('Fetched data:', response);
        } catch (error) {
            console.error(error);
            alert('No categories found or an error occurred');
        }
    };



    const handleSearch = () => {
        fetchCategories(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            fetchCategories(newPage);
        }
    };

    return (
        <div className="search-container">
            <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name or leave blank to list all"
            />
            <button onClick={handleSearch}>Search</button>

            {categories.length === 0 ? (
                <p>No data found.</p>
            ) : (
                <div className="results">
                    {categories.map((category) => (
                        <div key={category.id} className="category-block">
                            <h3>Category ID: {category.id} - {category.name}</h3>
                            <div className="food-items">
                                {category.FoodItems && category.FoodItems.length > 0 ? (
                                    category.FoodItems.map((item) => (
                                        <p key={item.id}>
                                            {item.name} - {item.quantity} - Expires on {new Date(item.expiration_date).toLocaleDateString()}
                                        </p>
                                    ))
                                ) : (
                                    <p>No food items found for this category.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
        </div>
    );
};

export default SearchByCategoryPage;



