import mongoose from "mongoose"
import config from "../../../config"
import ErrorModel from "@/api/db/models/ErrorModel"

const getErrors = async (req, res) => {
  //Endpoint that response with all the errors
  await mongoose.connect(config.db.uri)

  try {
    const errors = await ErrorModel.find({})
    res.status(200)
    res.send({ status: 200, data: errors })
  } catch (error) {
    res.status(500)
    res.send({ status: 500, error })
  } finally {
    await mongoose.disconnect()
  }
}

export default getErrors
