const mongoose = require('mongoose');

const BackupSchema = new mongoose.Schema({
  namaBackup: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

module.exports = mongoose.model('Backup', BackupSchema);
