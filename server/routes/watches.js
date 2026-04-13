const express = require('express')
const Watch = require('../models/Watch')

const router = express.Router()

// Get all watches with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sort = 'createdAt'
    } = req.query

    // Build filter object
    let filter = { isActive: true }

    if (category) filter.category = category
    if (brand) filter.brand = brand
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (search) {
      filter.$text = { $search: search }
    }

    // Build sort object
    let sortObj = {}
    switch (sort) {
      case 'price_asc':
        sortObj.price = 1
        break
      case 'price_desc':
        sortObj.price = -1
        break
      case 'name':
        sortObj.name = 1
        break
      case 'rating':
        sortObj.rating = -1
        break
      default:
        sortObj.createdAt = -1
    }

    const watches = await Watch.find(filter)
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')

    const total = await Watch.countDocuments(filter)

    res.json({
      watches,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single watch
router.get('/:id', async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id)
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' })
    }
    res.json(watch)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new watch (admin functionality)
router.post('/', async (req, res) => {
  try {
    const watch = new Watch(req.body)
    const savedWatch = await watch.save()
    res.status(201).json(savedWatch)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update watch (admin functionality)
router.put('/:id', async (req, res) => {
  try {
    const watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' })
    }
    res.json(watch)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete watch (admin functionality)
router.delete('/:id', async (req, res) => {
  try {
    const watch = await Watch.findByIdAndDelete(req.params.id)
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' })
    }
    res.json({ message: 'Watch deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get unique brands
router.get('/meta/brands', async (req, res) => {
  try {
    const brands = await Watch.distinct('brand', { isActive: true })
    res.json(brands.sort())
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get unique categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Watch.distinct('category', { isActive: true })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router