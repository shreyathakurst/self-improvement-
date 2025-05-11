import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide item text'],
    trim: true
  },
  behavior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Behavior',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
