const mongoose = require('mongoose');
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
    options: [Schema.Types.Mixed] // For predefined options (e.g., dropdown choices)
  }]
}, {
  timestamps: true
});



module.exports = mongoose.model('Category', CategorySchema);
