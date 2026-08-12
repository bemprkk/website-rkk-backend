const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// @route   GET api/content
// @desc    Get website content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      return res.json(null); // Biarkan frontend pakai fallback default
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/content
// @desc    Update website content
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    let content = await Content.findOne();
    
    if (content) {
      content.stats = req.body.stats;
      content.contact = req.body.contact;
      await content.save();
    } else {
      content = new Content({
        stats: req.body.stats,
        contact: req.body.contact
      });
      await content.save();
    }
    
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/content/reset
// @desc    Reset website content
// @access  Private
router.delete('/reset', auth, async (req, res) => {
  try {
    await Content.deleteMany({});
    res.json({ msg: 'Content reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
