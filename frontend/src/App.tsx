import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodItemForm from './components/FoodItemForm';
import SearchFoodItemPage from './pages/SearchFoodItemPage';
import SearchByCategoryPage from './pages/SearchByCategoryPage';
import './App.css';

const App: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string | null>(null);

    const handlePageSelect = (page: string) => {
        setSelectedPage(page);
    };

    const handleBackToHome = () => {
        setSelectedPage(null);
    };

    return (
        <div className="app-container">
            <Router>
                <div className="content">
                    <h1>Food Management System</h1>
                    {selectedPage === null ? (

                        <div className="nav-links">
                            <button onClick={() => handlePageSelect('add')} className="nav-box add-box">Add Food Item</button>
                            <button onClick={() => handlePageSelect('search')} className="nav-box search-box">Search Food Item</button>
                            <button onClick={() => handlePageSelect('category')} className="nav-box category-box">Search by Category</button>
                        </div>
                    ) : (

                        <div>
                            <button onClick={handleBackToHome} className="back-button">Back to Home</button>
                            <Routes>
                                {selectedPage === 'add' && <Route path="*" element={<FoodItemForm />} />}
                                {selectedPage === 'search' && <Route path="*" element={<SearchFoodItemPage />} />}
                                {selectedPage === 'category' && <Route path="*" element={<SearchByCategoryPage />} />}
                            </Routes>
                        </div>
                    )}
                </div>
            </Router>
        </div>
    );
};

export default App;





