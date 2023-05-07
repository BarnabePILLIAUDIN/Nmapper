import mongoose from "mongoose"
import config from "../../../config"
import ErrorModel from "../db/models/ErrorModel"

const saveError = async (scan) => {
  //Create a new document on the error collection of the db
  await mongoose.connect(config.db.uri)

  try {
    await ErrorModel.create(scan)
  } catch (err) {
    console.error(err) //eslint-disable-line
  } finally {
    await mongoose.disconnect()
  }
}

export default saveError
