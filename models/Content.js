const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  // Seluruh field WebsiteContent disimpan sebagai Mixed untuk fleksibilitas
  translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  images:       { type: mongoose.Schema.Types.Mixed, default: {} },
  stats:        { type: mongoose.Schema.Types.Mixed, default: {} },
  contact:      { type: mongoose.Schema.Types.Mixed, default: {} },
  proker:       { type: [mongoose.Schema.Types.Mixed], default: [] },
  trainings:    { type: [mongoose.Schema.Types.Mixed], default: [] },
  seminars:     { type: [mongoose.Schema.Types.Mixed], default: [] },
  partnerships: { type: [mongoose.Schema.Types.Mixed], default: [] },
  articles:     { type: [mongoose.Schema.Types.Mixed], default: [] },
  achievements: { type: [mongoose.Schema.Types.Mixed], default: [] },
  awards:       { type: [mongoose.Schema.Types.Mixed], default: [] },
  announcements:{ type: [mongoose.Schema.Types.Mixed], default: [] },
  alumni:       { type: [mongoose.Schema.Types.Mixed], default: [] },
  kasTransaksi: { type: [mongoose.Schema.Types.Mixed], default: [] },
  visitorCount: { type: Number, default: 0 },
}, {
  // Izinkan field tambahan dan tandai Mixed sebagai dimodifikasi saat save
  strict: false,
});

// Hanya ada 1 dokumen settings
module.exports = mongoose.model('Content', ContentSchema);
