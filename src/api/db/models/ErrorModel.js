import mongoose from "mongoose"
import ScanSchema from "../schema/ScanShema"

const ErrorModel = mongoose.modelNames().includes("Error")
  ? mongoose.model("Error")
  : mongoose.model("Error", ScanSchema)

export default ErrorModel
