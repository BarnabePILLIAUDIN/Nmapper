import mongoose from "mongoose"
import config from "../../../config"
import ScanModel from "../db/models/ScanModel"

const saveScan = async (scan) => {
  //create a new document in the scan collection of the db
  await mongoose.connect(config.db.uri)

  try {
    var { _id: id } = await ScanModel.create(scan)
  } catch (err) {
    console.error(err) //eslint-disable-line
  } finally {
    await mongoose.disconnect()
  }

  return id
}

export default saveScan
