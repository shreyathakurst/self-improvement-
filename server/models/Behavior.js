import mongoose from 'mongoose';

const BehaviorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a behavior name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
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

const Behavior = mongoose.model('Behavior', BehaviorSchema);

export default Behavior;
