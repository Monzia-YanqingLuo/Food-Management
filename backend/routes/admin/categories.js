const express = require('express');
const router = express.Router();
const { Category, FoodItem } = require('../../models');

// Create
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /admin/categories/:name - Get a single category by name and its food items
router.get('/:categoryName?', async (req, res) => {
    const { categoryName } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        if (!categoryName) {
            const categories = await Category.findAll({
                include: [{
                    model: FoodItem,
                    as: 'FoodItems',
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                }],
            });


            const totalItems = await Category.count();
            const totalPages = Math.ceil(totalItems / limit);

            return res.status(200).json({
                data: categories,
                totalPages,
                currentPage: parseInt(page),
            });
        } else {

            const category = await Category.findOne({
                where: { name: categoryName },
                include: [{ model: FoodItem, as: 'FoodItems' }],
            });

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            return res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// FGet
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
