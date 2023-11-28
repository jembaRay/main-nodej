const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  GenKon: {
    type: mongoose.Types.ObjectId,
    ref: 'Generator',
    required: true
  },
  Datas: [
    {
      Fuel: { type: Number, default: 0 },
      Temperature: { type: Number, default: 0 },
      batteryVoltage: { type: Number, default: 0 },
      batteryCurrent: { type: Number, default: 0 },
      Current: { type: Number, default: 0 }
    }
  ],
  TimestampOff: { type: Date, default: "0" }
}, { timestamps: true });

DataSchema.pre('save', function(next) {
  if (this.Datas.length < 2) {
    this.Datas.push(
      {
        Fuel: 0,
        Temperature: 0,
        batteryVoltage: 0,
        batteryCurrent: 0,
        Current: 0
      },
      {
        Fuel: 0,
        Temperature: 0,
        batteryVoltage: 0,
        batteryCurrent: 0,
        Current: 0
      }
    );
  }
  next();
});

module.exports = mongoose.model('Data', DataSchema);