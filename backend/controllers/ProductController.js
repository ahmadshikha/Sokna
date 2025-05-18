// const { createProduct } = require('../utils/functions');
import {createProduct,initializeBasicCategories} from '../utils/functions.js'

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


export async function exampleCreateCarProduct(userId, categoryId) {
  try {
    const carProductData = {
      title: '2018 Toyota Camry XLE',
      description: 'Well-maintained Toyota Camry with low mileage.',
      price: 22000,
      seller: userId,
      condition: 'used',
      category: categoryId,
      attributes: {
        make: 'Toyota',
        model: 'Camry',
        year: 2018,
        mileage: 35000,
        fuelType: 'Gasoline',
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

export async function exampleCreatePhoneProduct(userId, categoryId) {
  try {
    const phoneProductData = {
      title: 'iPhone 13 Pro - 128GB - Silver',
      description: 'Like new iPhone 13 Pro with all accessories.',
      price: 799,
      seller: userId,
      condition: 'used',
      category: categoryId,
      attributes: {
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        storageCapacity: 128,
        color: 'Silver',
        network: 'Unlocked'
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