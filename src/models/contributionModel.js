const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = Schema({
    value: {
        type: Number,
        require: [true, 'O valor da contribuição é obrigatório.']
    },
    payment_date: {
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
        require: [true, 'O cobrador da contribuição é obrigatório.'],
        autopopulate: true
    },
    description: {
        type: String
    }
});
contributionSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('contribution', contributionSchema);