const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// Field-field Mixed yang perlu di-markModified agar Mongoose menyimpannya
const MIXED_FIELDS = [
  'translations', 'images', 'stats', 'contact',
  'proker', 'trainings', 'seminars', 'partnerships',
  'articles', 'achievements', 'awards', 'announcements',
  'alumni', 'kasTransaksi',
];

// @route   GET api/content
// @desc    Get website content (seluruh data)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne().lean(); // .lean() → plain JS object
    if (!content) {
      return res.json(null);
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/content/visit
// @desc    Increment visitor counter
// @access  Public
router.post('/visit', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (content) {
      content.visitorCount = (content.visitorCount || 0) + 1;
      await content.save();
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/content
// @desc    Update seluruh website content (simpan semua field)
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    let content = await Content.findOne();

    if (content) {
      // Update setiap field dari request body
      MIXED_FIELDS.forEach((field) => {
        if (req.body[field] !== undefined) {
          content[field] = req.body[field];
          content.markModified(field); // wajib untuk Mixed type
        }
      });
      await content.save();
    } else {
      // Buat dokumen baru dengan seluruh data
      const newData = {};
      MIXED_FIELDS.forEach((field) => {
        if (req.body[field] !== undefined) {
          newData[field] = req.body[field];
        }
      });
      content = new Content(newData);
      await content.save();
    }

    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/content/reset
// @desc    Hapus semua dokumen content (factory reset)
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
