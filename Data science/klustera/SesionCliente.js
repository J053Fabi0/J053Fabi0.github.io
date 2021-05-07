const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    device_mac: {
      type: String,
      required: true,
    },
    branch_office: {
      type: Number,
      require: true,
    },
    month_tz: {
      type: Number,
      require: true,
    },
    day_tz: {
      type: Number,
      require: true,
    },
    day_of_week_tz: {
      type: String,
      require: true,
    },
    hour_tz: {
      type: Number,
      require: true,
    },
    conection_date: {
      type: Date,
    },
    visitor: {
      type: Boolean,
      require: true,
    },
    tiempodeses: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sesioncliente", schema);
