import mongoose from "mongoose"
import config from "../../../../config"
import ScanModel from "@/api/db/models/ScanModel"

const getScanById = async (req, res) => {
  //Endpoint that's give all the details of scan with it's id
  const { scanId } = req.query
  await mongoose.connect(config.db.uri)

  try {
    const scan = await ScanModel.findById(scanId)
    res.status(200)
    res.send({ status: 200, scan })
  } catch {
    // Not setting res status to 404 to avoid to show a next error in the front.
    // The fact that the taget is false will show a cutsom error in the front
    res.send({ scan: { target: false } })
  } finally {
    await mongoose.disconnect()
  }
}

export default getScanById
