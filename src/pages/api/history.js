import ScanModel from "@/api/db/models/ScanModel"
import mongoose from "mongoose"
import config from "../../../config"

const history = async (req, res) => {
  //Endpoint that respond with all the scans
  await mongoose.connect(config.db.uri)

  try {
    const data = await ScanModel.find({})
    res.status(200)
    res.send({ status: 200, data })
  } catch (error) {
    res.status(500)
    res.send({
      status: 500,
      error: "Oops something went wrong while trying to find you history",
    })
  } finally {
    await mongoose.disconnect()
  }
}

export default history
