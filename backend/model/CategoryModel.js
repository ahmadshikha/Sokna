import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  attributeDefinitions: [{
    
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['string', 'number', 'boolean', 'date'],
      default: 'string'
    },
    required: {
      type: Boolean,
      default: false
    },
    options: [Schema.Types.Mixed]
  }]
}, {
  timestamps: true
});


const Category= mongoose.model('Category', CategorySchema);
export default Category
