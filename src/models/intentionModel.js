const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intentionSchema = Schema({
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    require: [true, 'O tipo da contribuição é obrigatório.']
  },
  dun: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [false, 'O lançador da intenção é obrigatório.'],
    autopopulate: true
  },
  description: {
    type: String
  }
});
intentionSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('intention', intentionSchema);
