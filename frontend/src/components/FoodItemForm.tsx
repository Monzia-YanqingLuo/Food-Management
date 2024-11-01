import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addOrUpdateFoodItem } from '../api/foodItemApi';
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
                expiration_date: date.toISOString().split('T')[0], // 确保日期格式为 `yyyy-mm-dd`
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 验证 category_id 是否为正数
        if (form.category_id <= 0) {
            setError('Category ID must be a positive number');
            return;
        }

        try {
            await addOrUpdateFoodItem(form);
            setSuccessMessage('Food item added successfully');
            setForm({
                name: '',
                quantity: 0,
                expiration_date: '',
                category_id: 1,
            }); // 清空表单
        } catch (error) {
            console.error('Error adding food item');
            setError('Failed to add food item');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Food Item</h2>
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
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FoodItemForm;


