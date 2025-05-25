// const Product = require('../models/product');
// const Category = require('../models/category');
import Product from '../model/ProductModel.js'
import Category from '../model/categoryModel.js'
/**
 * Creates a new product after validating attributes against category definition
 * 
 * @param {Object} productData - Product data including category and attributes
 * @returns {Promise<Object>} Created product
 */
export async function createProduct(productData) {
  try {
    // Extract category from product data
    const { category: categoryId, attributes = {} } = productData;
    
    // Find the category to get attribute definitions
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }
    
    // Validate attributes against category definition
    const validationErrors = validateAttributes(attributes, category.attributeDefinitions);
    if (validationErrors.length > 0) {
      throw new Error(`Attribute validation failed: ${validationErrors.join(', ')}`);
    }
    
    // Create and save the product
    const product = new Product(productData);
    await product.save();
    
    return product;
  } catch (error) {
    throw error;
  }
}

/**
 * Validates product attributes against category attribute definitions
 * 
 * @param {Object} attributes - Product attributes to validate
 * @param {Array} attributeDefinitions - Category attribute definitions
 * @returns {Array} Array of validation error messages, empty if valid
 */
function validateAttributes(attributes, attributeDefinitions) {
  const errors = [];
  
  // Check for required attributes
  for (const attrDef of attributeDefinitions) {
    const attrName = attrDef.name;
    const attrValue = attributes[attrName];
    
    // Check if required attribute is missing
    if (attrDef.required && (attrValue === undefined || attrValue === null || attrValue === '')) {
      errors.push(`Required attribute '${attrDef.label}' is missing`);
      continue;
    }
    
    // Skip validation if attribute is not provided and not required
    if (attrValue === undefined || attrValue === null) {
      continue;
    }
    
    // Validate attribute type
    const attrType = attrDef.type;
    let isValidType = true;
    
    switch (attrType) {
      case 'string':
        isValidType = typeof attrValue === 'string';
        break;
      case 'number':
        isValidType = !isNaN(Number(attrValue));
        break;
      case 'boolean':
        isValidType = typeof attrValue === 'boolean' || attrValue === 'true' || attrValue === 'false';
        break;
      case 'date':
        isValidType = !isNaN(Date.parse(attrValue));
        break;
    }
    
    if (!isValidType) {
      errors.push(`Attribute '${attrDef.label}' has invalid type. Expected ${attrType}`);
    }
    
    // Validate against options if defined
    if (attrDef.options && attrDef.options.length > 0) {
      const optionValues = attrDef.options.map(opt => 
        typeof opt === 'object' && opt !== null ? opt.value : opt
      );
      
      if (!optionValues.includes(attrValue)) {
        errors.push(`Attribute '${attrDef.label}' has invalid value. Must be one of: ${optionValues.join(', ')}`);
      }
    }
  }
  
  return errors;
}

/**
 * Creates a category with the given properties and optional subcategories
 *
 * @param {Object} categoryData - Category properties
 * @param {Array} subcategories - Array of subcategory names to create
 * @param {Object} attributesBySubcategory - Map of subcategory names to attribute definitions
 * @returns {Promise<Object>} Main category object
 */
async function createCategoryWithSubcategories(categoryData, subcategories = [], attributesBySubcategory = {}) {
  try {
    // Create the main category
    const mainCategory = new Category({
      name: categoryData.name,
      icon: categoryData.icon,
      level: 0,
      attributeDefinitions: [] // Main categories typically don't have attributes
    });
    
    await mainCategory.save();
    console.log(`Created main category: ${categoryData.name}`);
    
    // Create each subcategory
    for (const subcategoryName of subcategories) {
      const subcategory = new Category({
        name: subcategoryName,
        parent: mainCategory._id,
        level: 1,
        attributeDefinitions: attributesBySubcategory[subcategoryName] || []
      });
      
      await subcategory.save();
      console.log(`Created subcategory: ${subcategoryName} under ${categoryData.name}`);
    }
    
    return mainCategory;
  } catch (error) {
    console.error(`Error creating category ${categoryData.name}:`, error);
    throw error;
  }
}

// Initialize all categories and subcategories
export async function initializeBasicCategories(req,res) {
  try {
    // Check if categories already exist
    const count = await Category.countDocuments();
    if (count > 0) {
      console.log('Categories already initialized');
      return;
    }
    
    // Define attribute definitions by subcategory
    const attributeDefinitions = {
      // Vehicles subcategories
      'Cars for Sale': [
        { name: 'make', label: 'Make', type: 'string', required: true },
        { name: 'model', label: 'Model', type: 'string', required: true },
        { name: 'year', label: 'Year', type: 'number', required: true },
        { name: 'mileage', label: 'Mileage', type: 'number', required: true },
        { name: 'fuelType', label: 'Fuel Type', type: 'string', required: true, options: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'] },
        { name: 'transmission', label: 'Transmission', type: 'string', required: true, options: ['Automatic', 'Manual'] },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'bodyType', label: 'Body Type', type: 'string', required: false, options: ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Coupe', 'Van'] },
        { name: 'seats', label: 'Number of Seats', type: 'number', required: true },
        { name: 'fourWheelDrive', label: '4x4/AWD', type: 'boolean', required: false }
      ],
      'Cars for Rent': [
        { name: 'make', label: 'Make', type: 'string', required: true },
        { name: 'model', label: 'Model', type: 'string', required: true },
        { name: 'year', label: 'Year', type: 'number', required: true },
        { name: 'rentalPeriod', label: 'Rental Period', type: 'string', required: true, options: ['Daily', 'Weekly', 'Monthly'] },
        { name: 'fuelType', label: 'Fuel Type', type: 'string', required: true, options: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'] },
        { name: 'transmission', label: 'Transmission', type: 'string', required: true, options: ['Automatic', 'Manual'] },
        { name: 'seats', label: 'Number of Seats', type: 'number', required: true },
        { name: 'unlimited', label: 'Unlimited Mileage', type: 'boolean', required: false },
        { name: 'deposit', label: 'Security Deposit', type: 'number', required: false }
      ],
      
      // Properties subcategories
      'Apartments for Sale': [
        { name: 'size', label: 'Size (sq m)', type: 'number', required: true },
        { name: 'bedrooms', label: 'Bedrooms', type: 'number', required: true },
        { name: 'bathrooms', label: 'Bathrooms', type: 'number', required: true },
        { name: 'floor', label: 'Floor', type: 'number', required: false },
        { name: 'propertyAge', label: 'Property Age', type: 'number', required: false },
        { name: 'furnished', label: 'Furnished', type: 'boolean', required: true },
        { name: 'parking', label: 'Parking Available', type: 'boolean', required: false },
        { name: 'amenities', label: 'Amenities', type: 'string', required: false }
      ],
      'Apartments for Rent': [
        { name: 'size', label: 'Size (sq m)', type: 'number', required: true },
        { name: 'bedrooms', label: 'Bedrooms', type: 'number', required: true },
        { name: 'bathrooms', label: 'Bathrooms', type: 'number', required: true },
        { name: 'rentalPeriod', label: 'Rental Period', type: 'string', required: true, options: ['Monthly', 'Yearly'] },
        { name: 'furnished', label: 'Furnished', type: 'boolean', required: true },
        { name: 'petsAllowed', label: 'Pets Allowed', type: 'boolean', required: false },
        { name: 'utilities', label: 'Utilities Included', type: 'boolean', required: true },
        { name: 'deposit', label: 'Security Deposit', type: 'number', required: false }
      ],
      
      // Mobiles & Tablets subcategories
      'Mobile Phones': [
        { name: 'brand', label: 'Brand', type: 'string', required: true },
        { name: 'model', label: 'Model', type: 'string', required: true },
        { name: 'storageCapacity', label: 'Storage Capacity (GB)', type: 'number', required: true },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] },
        { name: 'warranty', label: 'Warranty', type: 'boolean', required: false }
      ],
      'Tablets': [
        { name: 'brand', label: 'Brand', type: 'string', required: true },
        { name: 'model', label: 'Model', type: 'string', required: true },
        { name: 'screenSize', label: 'Screen Size (inches)', type: 'number', required: true },
        { name: 'storageCapacity', label: 'Storage Capacity (GB)', type: 'number', required: true },
        { name: 'wifi', label: 'WiFi Only', type: 'boolean', required: true },
        { name: 'cellular', label: 'Cellular', type: 'boolean', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      
      // Electronics & Appliances subcategories
      'TV - Audio - Video': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['TV', 'Speaker', 'Headphones', 'Projector', 'Other'] },
        { name: 'brand', label: 'Brand', type: 'string', required: true },
        { name: 'screenSize', label: 'Screen Size (inches)', type: 'number', required: false },
        { name: 'resolution', label: 'Resolution', type: 'string', required: false, options: ['HD', 'Full HD', '4K', '8K', 'N/A'] },
        { name: 'smartTV', label: 'Smart TV', type: 'boolean', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      'Computers - Accessories': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['Desktop', 'Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Printer', 'Other'] },
        { name: 'brand', label: 'Brand', type: 'string', required: true },
        { name: 'processor', label: 'Processor', type: 'string', required: false },
        { name: 'ram', label: 'RAM (GB)', type: 'number', required: false },
        { name: 'storageCapacity', label: 'Storage Capacity (GB)', type: 'number', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      
      // Furniture & Decor subcategories
      'Bathroom': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['Cabinet', 'Mirror', 'Shower', 'Toilet', 'Sink', 'Other'] },
        { name: 'material', label: 'Material', type: 'string', required: true },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      'Bedroom': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['Bed', 'Wardrobe', 'Dresser', 'Nightstand', 'Mirror', 'Other'] },
        { name: 'material', label: 'Material', type: 'string', required: true },
        { name: 'size', label: 'Size', type: 'string', required: false, options: ['Twin', 'Full', 'Queen', 'King', 'N/A'] },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      
      // Fashion & Beauty subcategories
      'Women\'s Clothing': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['Dresses', 'Tops', 'Pants', 'Skirts', 'Outerwear', 'Other'] },
        { name: 'size', label: 'Size', type: 'string', required: true },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'material', label: 'Material', type: 'string', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      'Men\'s Clothing': [
        { name: 'type', label: 'Type', type: 'string', required: true, options: ['Shirts', 'Pants', 'Suits', 'Outerwear', 'Shoes', 'Other'] },
        { name: 'size', label: 'Size', type: 'string', required: true },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'material', label: 'Material', type: 'string', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] }
      ],
      
      // Pets subcategories
      'Birds - Pigeons': [
        { name: 'breed', label: 'Breed', type: 'string', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'string', required: true, options: ['Male', 'Female', 'Unknown'] },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'vaccinated', label: 'Vaccinated', type: 'boolean', required: false }
      ],
      'Cats': [
        { name: 'breed', label: 'Breed', type: 'string', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'string', required: true, options: ['Male', 'Female'] },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'vaccinated', label: 'Vaccinated', type: 'boolean', required: true },
        { name: 'neutered', label: 'Neutered/Spayed', type: 'boolean', required: false }
      ],
      
      // Kids & Babies subcategories
      'Baby & Mom Healthcare': [
        { name: 'type', label: 'Type', type: 'string', required: true },
        { name: 'brand', label: 'Brand', type: 'string', required: true },
        { name: 'ageGroup', label: 'Age Group', type: 'string', required: false },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair'] }
      ],
      'Baby Clothing': [
        { name: 'type', label: 'Type', type: 'string', required: true },
        { name: 'size', label: 'Size', type: 'string', required: true },
        { name: 'gender', label: 'Gender', type: 'string', required: true, options: ['Boy', 'Girl', 'Unisex'] },
        { name: 'ageRange', label: 'Age Range', type: 'string', required: true },
        { name: 'color', label: 'Color', type: 'string', required: true },
        { name: 'condition', label: 'Condition', type: 'string', required: true, options: ['New', 'Like New', 'Good', 'Fair'] }
      ]
    };
    
    // Create all categories with subcategories
    const categoriesConfig = [
      {
        name: 'Vehicles',
        icon: '🚗',
        subcategories: ['Cars for Sale', 'Cars for Rent']
      },
      {
        name: 'Properties',
        icon: '🏠',
        subcategories: ['Apartments for Sale', 'Apartments for Rent']
      },
      {
        name: 'Mobiles & Tablets',
        icon: '📱',
        subcategories: ['Mobile Phones', 'Tablets']
      },
      {
        name: 'Electronics & Appliances',
        icon: '📺',
        subcategories: ['TV - Audio - Video', 'Computers - Accessories']
      },
      {
        name: 'Furniture & Decor',
        icon: '🛋️',
        subcategories: ['Bathroom', 'Bedroom']
      },
      {
        name: 'Fashion & Beauty',
        icon: '👗',
        subcategories: ['Women\'s Clothing', 'Men\'s Clothing']
      },
      {
        name: 'Pets',
        icon: '🐾',
        subcategories: ['Birds - Pigeons', 'Cats']
      },
      {
        name: 'Kids & Babies',
        icon: '👶',
        subcategories: ['Baby & Mom Healthcare', 'Baby Clothing']
      }
    ];
    
    // Create all categories and their subcategories
    for (const categoryConfig of categoriesConfig) {
      await createCategoryWithSubcategories(
        categoryConfig, 
        categoryConfig.subcategories, 
        attributeDefinitions
      );
    }
    
    console.log('All categories and subcategories initialized successfully');
    return res.status(400).json({ message: "All categories and subcategories initialized successfully" });

  } catch (error) {
    console.error('Error initializing categories:', error);
    throw error;
  }
}


