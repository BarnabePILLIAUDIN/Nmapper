import mongoose from "mongoose"
import ScanSchema from "../schema/ScanShema"

const ScanModel = mongoose.modelNames().includes("scans")
  ? mongoose.model("scans")
  : mongoose.model("scans", ScanSchema)

export default ScanModel
