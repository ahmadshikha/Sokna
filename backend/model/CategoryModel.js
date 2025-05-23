import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    default: '📦'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0
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

CategorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

CategorySchema.methods.isSubcategory = function() {
  return this.parent !== null;
};

const Category = mongoose.model('Category', CategorySchema);
export default Category
