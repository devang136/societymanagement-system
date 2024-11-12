const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestName: { type: String, required: true },
    requesterName: { type: String, required: true },
    date: { type: Date, required: true },
    wing: { type: String, required: true },
    unit: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
