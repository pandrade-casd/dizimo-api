const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributorSchema = new Schema({
  name: {
    type: String,
    required: [true, "O nome é obrigatório"]
  },
  born_date: {
    type: String,
    required: false,
    default: Date.now
  },
  id_number: {
    type: Number,
    required: [true, "O código do Dizimista é obrigatório"],
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: false
  },
  sex: {
    type: String,
    enum: ["M", "F", null]
  },
  phone: {
    type: String
  },
  cellphone: {
    type: String
  },
  address: {
    code: {
      type: String
    },
    street: String,
    number: Number,
    complement: String,
    district: String,
    city: String
  },
  active: {
    type: Boolean,
    default: true
  },
  inactive_reason: {
    type: String,
    default: "Motivo não informado"
  },
  contributions: [
    {
      value: Number,
      dun: String,
      payment_date: {
        type: Date,
        default: Date.now
      },
      year: {
        type: Number,
        // required: [true, "O ano é obrigatório"]
      },
      month: {
        type: String,
        // required: [true, "O mês é obrigatório"]
      }
    }
  ],
  children: [
    {
      name: String,
      born_date: Date,
      sex: {
        type: String,
        enum: ["M", "F"]
      }
    }
  ],
  insert_date: {
    type: Date,
    default: Date.now
  }
});

const contributor = mongoose.model("contributor", contributorSchema);

module.exports = contributor;
