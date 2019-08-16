const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  creator: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
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