import express from 'express';
import mongoose from 'mongoose';
import auth from '../middlewares/auth.js';
import Behavior from '../models/Behavior.js';
import Item from '../models/Item.js';

const router = express.Router();

// @route   GET api/behaviors/top
router.get('/top', auth, async (req, res) => {
  try {
    const behaviors = await Item.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: '$behavior', itemCount: { $sum: 1 } } },
      { $sort: { itemCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'behaviors',
          localField: '_id',
          foreignField: '_id',
          as: 'behaviorDetails'
        }
      },
      { $unwind: '$behaviorDetails' },
      {
        $project: {
          _id: '$behaviorDetails._id',
          name: '$behaviorDetails.name',
          description: '$behaviorDetails.description',
          itemCount: 1
        }
      }
    ]);

    if (behaviors.length < 5) {
      const behaviorIds = behaviors.map(b => b._id);
      const additionalBehaviors = await Behavior.find({
        user: req.user.id,
        _id: { $nin: behaviorIds }
      }).sort({ createdAt: -1 }).limit(5 - behaviors.length);

      const formatted = additionalBehaviors.map(b => ({
        _id: b._id,
        name: b.name,
        description: b.description,
        itemCount: 0
      }));

      behaviors.push(...formatted);
    }

    res.json(behaviors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/behaviors
router.get('/', auth, async (req, res) => {
  try {
    const behaviors = await Behavior.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(behaviors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/behaviors/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const behavior = await Behavior.findById(req.params.id);

    if (!behavior) return res.status(404).json({ message: 'Behavior not found' });
    if (behavior.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    res.json(behavior);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Behavior not found' });
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/behaviors
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBehavior = new Behavior({ name, description, user: req.user.id });
    const behavior = await newBehavior.save();
    res.json(behavior);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/behaviors/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    let behavior = await Behavior.findById(req.params.id);

    if (!behavior) return res.status(404).json({ message: 'Behavior not found' });
    if (behavior.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    behavior.name = name || behavior.name;
    behavior.description = description !== undefined ? description : behavior.description;
    await behavior.save();

    res.json(behavior);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Behavior not found' });
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/behaviors/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const behavior = await Behavior.findById(req.params.id);
    if (!behavior) return res.status(404).json({ message: 'Behavior not found' });
    if (behavior.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await Item.deleteMany({ behavior: req.params.id });
    await behavior.remove();

    res.json({ message: 'Behavior removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Behavior not found' });
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/behaviors/:id/items
router.get('/:id/items', auth, async (req, res) => {
  try {
    const behavior = await Behavior.findById(req.params.id);
    if (!behavior) return res.status(404).json({ message: 'Behavior not found' });
    if (behavior.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const items = await Item.find({ behavior: req.params.id, user: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Behavior not found' });
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/behaviors/:id/items
router.post('/:id/items', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const behavior = await Behavior.findById(req.params.id);

    if (!behavior) return res.status(404).json({ message: 'Behavior not found' });
    if (behavior.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const newItem = new Item({ text, behavior: req.params.id, user: req.user.id });
    const item = await newItem.save();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Behavior not found' });
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
