import express from 'express';
import auth from '../middlewares/auth.js';
import Item from '../models/Item.js';

const router = express.Router();

// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;

    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    item.text = text || item.text;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await item.remove();
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
