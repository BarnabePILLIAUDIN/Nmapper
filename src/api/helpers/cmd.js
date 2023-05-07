import { exec } from "node:child_process"
const cmd = (command) =>
  //Return a promise that will resove when the scan is over
  new Promise((resolve) => {
    exec(command, async (err, stdout, stderr) => {
      if (stdout) {
        //We return a value to know wheather the scan feced issue or not and the output (stdout or stderr)
        resolve([true, stdout])

        return
      }

      if (stderr) {
        resolve([false, stderr])
      }
    })
  })

export default cmd
