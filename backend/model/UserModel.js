import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { 
      type: String, 
      enum: ['admin', 'seller', 'buyer'], 
      default: 'buyer' 
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost' }],
    chatIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    createdAt: { type: Date, default: Date.now }
  });

const User = mongoose.model('User', userSchema);

export default User;