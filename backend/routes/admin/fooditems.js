const express = require('express');
const router = express.Router();
const { FoodItem, Category} = require('../../models'); // Adjust the path as needed

// GET /admin/fooditems - Get all food items with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * imit;

    try {
        const foodItems = await FoodItem.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['expiration_date', 'ASC']],
        });

        const totalPages = Math.ceil(foodItems.count / limit);

        res.status(200).json({
            data: foodItems.rows,
            totalPages,
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /admin/fooditems/:name - Get food items by name
router.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const foodItems = await FoodItem.findAll({
            where: { name },
        });

        if (!foodItems || foodItems.length === 0) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({
            data: foodItems,
            totalPages: 1,
            currentPage: 1,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// GET /admin/fooditems/:id - Get a single food item by ID
router.get('/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findByPk(req.params.id);
        if (foodItem) {
            res.status(200).json(foodItem);
        } else {
            res.status(404).json({ message: 'Food item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /admin/fooditems - Create a new food item
router.post('/', async (req, res) => {
    try {
        const newFoodItem = await FoodItem.create(req.body);
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /admin/fooditems/:id - Update an existing food item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, expiration_date, category_id } = req.body;

    try {
        const foodItem = await FoodItem.findByPk(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        await foodItem.update({
            name,
            quantity,
            expiration_date,
            category_id,
        });

        res.status(200).json({ message: 'Food item updated successfully', foodItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//PUT new food
router.put('/', async (req, res) => {
    const { name, quantity, expiration_date, category_id } = req.body;

    try {
        let foodItem = await FoodItem.findOne({ where: { name } });
        if (foodItem) {
            foodItem.quantity = quantity;
            foodItem.expiration_date = expiration_date;
            foodItem.category_id = category_id;
            await foodItem.save();
        } else {
            foodItem = await FoodItem.create({ name, quantity, expiration_date, category_id });
        }
        res.status(200).json({ message: 'Food item added or updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /admin/fooditems/:id - Delete a food item by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const foodItem = await FoodItem.findByPk(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        await foodItem.destroy();
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;


