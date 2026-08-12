const express = require('express');
const router = express.Router();
const Backup = require('../models/Backup');
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// @route   GET api/backup
// @desc    Get all backups (only basic info, omit massive 'data' field)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const backups = await Backup.find().select('-data').sort({ tanggal: -1 });
    res.json(backups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/backup
// @desc    Create a new backup snapshot from current Content
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { namaBackup } = req.body;
    if (!namaBackup) {
      return res.status(400).json({ msg: 'Nama backup harus diisi' });
    }

    const currentContent = await Content.findOne().lean();
    if (!currentContent) {
      return res.status(400).json({ msg: 'Tidak ada data content aktif untuk dibackup' });
    }

    const newBackup = new Backup({
      namaBackup,
      data: currentContent
    });

    await newBackup.save();
    res.json({ msg: 'Backup berhasil dibuat' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/backup/restore/:id
// @desc    Restore a backup to Content collection
// @access  Private
router.post('/restore/:id', auth, async (req, res) => {
  try {
    const backup = await Backup.findById(req.params.id);
    if (!backup) {
      return res.status(404).json({ msg: 'Backup tidak ditemukan' });
    }

    // Ganti data active Content dengan data dari backup
    await Content.deleteMany({});
    
    // Hilangkan field _id internal Mongoose dari backup.data
    const backupData = { ...backup.data };
    delete backupData._id;

    const restoredContent = new Content(backupData);
    await restoredContent.save();

    res.json({ msg: 'Data berhasil di-restore' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/backup/:id
// @desc    Delete a backup
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Backup.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Backup berhasil dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
