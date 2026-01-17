const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

// Ensure result includes 'id' field to maintain compatibility if needed, 
// though standard Mongoose uses '_id'. We can use a virtual or just handle it in controller.
itemSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Item', itemSchema);
