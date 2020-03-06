import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },

  description: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true // Change to false later on when user can submit categories
  },

  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

}, { timestamps: true });