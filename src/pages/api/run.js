import cmd from "@/api/helpers/cmd"
import config from "../../../config"
import saveScan from "@/api/helpers/saveScan"
import saveError from "@/api/helpers/saveErrror"

const run = async (req, res) => {
  //Extratcting all the options for the scan
  const {
    target,
    scanOption,
    showOs,
    hostTimeOut,
    maxRetries,
    selectedPorts,
    name,
  } = req.body

  //Preparing the command
  const nmapCmd = `echo ${
    config.security.sudoPassword
  }|sudo -S nmap ${scanOption} ${showOs ? "-O" : ""} ${
    hostTimeOut ? `--host-timeout ${hostTimeOut}s` : null
  } ${maxRetries ? `--max-retries ${maxRetries}` : null} ${
    selectedPorts?.length > 0 ? `-p ${selectedPorts.toString()}` : null
  } ${target}`

  //Run the command
  const [success, output] = await cmd(nmapCmd)
  //Preparing the document that will be saved saved in the db
  const scanParams = {
    name,
    target,
    scanOption,
    showOs,
    hostTimeOut,
    maxRetries,
    selectedPorts,
    output,
  }

  //sending the id as a response so the user is redirected to the page of his scan
  if (success) {
    const id = await saveScan(scanParams)
    res.send(id)

    return
  }

  //If it's an error he will be redirected to the history page
  await saveError(scanParams)
  res.send("ERROR")
}

export default run
