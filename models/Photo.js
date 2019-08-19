const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['hands', 'feet', 'face', 'figure', 'other']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
