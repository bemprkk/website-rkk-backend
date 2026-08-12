const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  stats: {
    members: String,
    projects: String,
    board: String,
    alumni: String
  },
  contact: {
    lokasi: String,
    jamAktif: String,
    email: String,
    instagram: String,
    instagramUrl: String,
    mapsUrl: String
  }
});

// Kita asumsikan hanya ada 1 document settings
module.exports = mongoose.model('Content', ContentSchema);
