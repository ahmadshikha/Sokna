// const { createProduct } = require('../utils/functions');
import {createProduct,initializeBasicCategories} from '../utils/functions.js'
import Category from '../model/categoryModel.js'

export async function addProduct(req, res) {
  try {
    const productData = req.body;
    
    productData.seller = req.userId; 
    
    const product = await createProduct(productData);
    
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// Get all categories with their subcategories
export async function getAllCategories(req, res) {
  try {
    const mainCategories = await Category.find({ level: 0 })
      .populate('subcategories')
      .sort({ name: 1 });
    
    const categoriesWithSubs = mainCategories.map(category => ({
      _id: category._id,
      name: category.name,
      icon: category.icon,
      subcategories: category.subcategories.map(sub => ({
        _id: sub._id,
        name: sub.name,
        attributeDefinitions: sub.attributeDefinitions
      }))
    }));
    
    res.status(200).json({
      success: true,
      categories: categoriesWithSubs
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false, 
      error: 'Failed to fetch categories'
    });
  }
}

export async function exampleCreateCarProduct(userId, subcategoryId) {
  try {
    // Find the subcategory first to verify it exists
    const subcategory = await Category.findById(subcategoryId);
    if (!subcategory) {
      throw new Error(`Subcategory with ID ${subcategoryId} not found`);
    }
    
    const carProductData = {
      title: '2018 Toyota Camry XLE',
      description: 'Well-maintained Toyota Camry with low mileage.',
      price: 22000,
      seller: userId,
      condition: 'used',
      category: subcategoryId, 
      attributes: {
        make: 'Toyota',
        model: 'Camry',
        year: 2018,
        mileage: 35000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        color: 'Silver',
        bodyType: 'Sedan',
        seats: 5,
        fourWheelDrive: false
      },
      images: [
        { url: 'https://example.com/car-front.jpg', isPrimary: true },
        { url: 'https://example.com/car-interior.jpg' }
      ],
      quantity: 1,
      status: 'active',
      location: {
        country: 'United States',
        city: 'Dallas'
      }
    };
    
    const product = await createProduct(carProductData);
    console.log('Car product created successfully:', product._id);
    return product;
  } catch (error) {
    console.error('Error in example car creation:', error.message);
    throw error;
  }
}

export async function exampleCreatePhoneProduct(userId, subcategoryId) {
  try {
    // Find the subcategory first to verify it exists
    const subcategory = await Category.findById(subcategoryId);
    if (!subcategory) {
      throw new Error(`Subcategory with ID ${subcategoryId} not found`);
    }
    
    const phoneProductData = {
      title: 'iPhone 13 Pro - 128GB - Silver',
      description: 'Like new iPhone 13 Pro with all accessories.',
      price: 799,
      seller: userId,
      condition: 'used',
      category: subcategoryId, 
      attributes: {
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        storageCapacity: 128,
        color: 'Silver',
        condition: 'Like New',
        warranty: true
      },
      images: [
        { url: 'https://example.com/iphone-front.jpg', isPrimary: true }
      ],
      quantity: 1,
      status: 'active',
      location: {
        country: 'United States',
        city: 'New York'
      }
    };
    
    const product = await createProduct(phoneProductData);
    console.log('Phone product created successfully:', product._id);
    return product;
  } catch (error) {
    console.error('Error in example phone creation:', error.message);
    throw error;
  }
}