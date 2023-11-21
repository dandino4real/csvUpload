

// Example EntryModel schema definition
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  msisdn: String,
  quantity: Number,
  narration: String,
});

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;
