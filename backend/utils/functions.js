const Product = require('../models/product');
const Category = require('../models/category');

/**
 * Creates a new product after validating attributes against category definition
 * 
 * @param {Object} productData - Product data including category and attributes
 * @returns {Promise<Object>} Created product
 */
async function createProduct(productData) {
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

module.exports = { createProduct };

// Example of initializing categories
async function initializeBasicCategories() {
  try {
    // Check if categories already exist
    const count = await Category.countDocuments();
    if (count > 0) {
      console.log('Categories already initialized');
      return;
    }
    
    // Create vehicles category
    const vehiclesCategory = new Category({
      name: 'Vehicles',
      attributeDefinitions: [
        {
          name: 'make',
          label: 'Make',
          type: 'string',
          required: true
        },
        {
          name: 'model',
          label: 'Model',
          type: 'string',
          required: true
        },
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          required: true
        },
        {
          name: 'mileage',
          label: 'Mileage',
          type: 'number',
          required: true
        },
        {
          name: 'fuelType',
          label: 'Fuel Type',
          type: 'string',
          required: true,
          options: ['Gasoline', 'Diesel', 'Electric', 'Hybrid']
        },
        {
          name: 'seats',
          label: 'Number of Seats',
          type: 'number',
          required: true
        },
        {
          name: 'fourWheelDrive',
          label: '4x4/AWD',
          type: 'boolean',
          required: false
        }
      ]
    });
    
    await vehiclesCategory.save();
    
    // Create electronics category
    const electronicsCategory = new Category({
      name: 'Electronics',
      attributeDefinitions: [
        {
          name: 'brand',
          label: 'Brand',
          type: 'string',
          required: true
        },
        {
          name: 'model',
          label: 'Model',
          type: 'string',
          required: true
        },
        {
          name: 'condition',
          label: 'Condition',
          type: 'string',
          required: true,
          options: ['New', 'Like New', 'Good', 'Fair', 'Poor']
        }
      ]
    });
    
    await electronicsCategory.save();
    
    // Create smartphones subcategory with additional attributes
    const smartphonesCategory = new Category({
      name: 'Smartphones',
      attributeDefinitions: [
        {
          name: 'brand',
          label: 'Brand',
          type: 'string',
          required: true
        },
        {
          name: 'model',
          label: 'Model',
          type: 'string',
          required: true
        },
        {
          name: 'storageCapacity',
          label: 'Storage Capacity (GB)',
          type: 'number',
          required: true
        },
        {
          name: 'color',
          label: 'Color',
          type: 'string',
          required: true
        },
        {
          name: 'network',
          label: 'Network',
          type: 'string',
          required: false,
          options: ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile', 'Sprint', 'Other']
        }
      ]
    });
    
    await smartphonesCategory.save();
    
    console.log('Basic categories initialized successfully');
  } catch (error) {
    console.error('Error initializing categories:', error);
  }
}


