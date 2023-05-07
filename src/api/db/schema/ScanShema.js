import mongoose from "mongoose"
const ScanSchema = mongoose.Schema({
  name: String,
  target: {
    type: String,
    required: true,
  },
  scanOption: {
    type: String,
    required: true,
  },
  hostTimeOut: Number,
  maxRetries: Number,
  showOs: Boolean,
  selectedPorts: [Number],
  output: {
    type: String,
    required: true,
  },
})

export default ScanSchema
