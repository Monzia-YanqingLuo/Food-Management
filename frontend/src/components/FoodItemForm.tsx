import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addOrUpdateFoodItem, getFoodItemByName } from '../api/foodItemApi';
import { FoodItem } from '../types';
import './FormStyles.css';

const FoodItemForm: React.FC = () => {
    const [form, setForm] = useState<FoodItem>({
        name: '',
        quantity: 0,
        expiration_date: '',
        category_id: 1,
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isExistingItem, setIsExistingItem] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setForm({
                ...form,
                expiration_date: date.toISOString().split('T')[0],
            });
        }
    };

    // 检查食物项是否已存在
    const checkExistingFoodItem = async () => {
        if (form.name) {
            try {
                const existingItem = await getFoodItemByName(form.name);
                if (existingItem) {
                    setIsExistingItem(true);
                    setSuccessMessage(`Food item "${form.name}" exists. Editing mode enabled.`);
                } else {
                    setIsExistingItem(false);
                }
            } catch (error) {
                console.error('Error checking food item:', error);
                setError('Error checking food item existence.');
            }
        }
    };
    
    useEffect(() => {
        checkExistingFoodItem();
    }, [form.name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.category_id <= 0) {
            setError('Category ID must be a positive number');
            return;
        }

        try {
            const confirmMessage = isExistingItem
                ? `Are you sure you want to update "${form.name}"?`
                : `Are you sure you want to add "${form.name}"?`;

            if (window.confirm(confirmMessage)) {
                await addOrUpdateFoodItem(form);
                setSuccessMessage(
                    isExistingItem
                        ? `Food item "${form.name}" updated successfully!`
                        : `Food item "${form.name}" added successfully!`
                );
                setForm({
                    name: '',
                    quantity: 0,
                    expiration_date: '',
                    category_id: 1,
                });
                setIsExistingItem(false);
            }
        } catch (error) {
            console.error('Error adding/updating food item:', error);
            setError('Failed to add/update food item');
        }
    };

    return (
        <div className="form-container">
            <h2>{isExistingItem ? `Update Food Item` : 'Add Food Item'}</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="food-item-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter food name"
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </label>
                <label>
                    Expiration Date:
                    <DatePicker
                        selected={form.expiration_date ? new Date(form.expiration_date) : null}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/DD/YYYY"
                    />
                </label>
                <label>
                    Category ID:
                    <input
                        type="number"
                        name="category_id"
                        value={form.category_id}
                        onChange={handleChange}
                        placeholder="Enter category ID"
                        required
                    />
                </label>
                <button type="submit">{isExistingItem ? 'Update Food Item' : 'Add Food Item'}</button>
            </form>
        </div>
    );
};

export default FoodItemForm;
