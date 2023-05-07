import axios from "axios"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import Loader from "./Loader"

const ScanForm = () => {
  // Form that collect the data for the scan
  //Is called by the index page

  //Setting the state
  const [timeoutEnable, setTimeoutEnable] = useState(false)
  const [maxRetriesEnable, setMaxRetriesEnable] = useState(false)
  const [selectedPortsEnable, setSelectedPortEnable] = useState(false)
  const [showOs, setShowOs] = useState(false)
  const [selectedPorts, setSelectedPorts] = useState([])
  const [submited, setSubmited] = useState(false)

  const router = useRouter()
  const validationRegex =
    /^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/

  //setting the refs
  const nameInputRef = useRef(null)
  const domainInputRef = useRef(null)
  const scanOptionInputRef = useRef(null)
  const maxRetriesInputRef = useRef(null)
  const hostTimeoutInputRef = useRef(null)
  const selectPortInputRef = useRef(null)
  const formRef = useRef(null)

  const toggleShowOs = () => {
    setShowOs(!showOs)
  }

  const handlePortAdd = () => {
    //Called when a new port is added
    const newPort = Number.parseInt(selectPortInputRef.current.value, 10)

    if (isNaN(newPort)) {
      alert("A port must be a number")

      return
    }

    if (selectedPorts.includes(newPort)) {
      alert("This port is already in the list")

      return
    }

    setSelectedPorts([...selectedPorts, newPort])
  }

  const handleSubmit = (e) => {
    //Is called when the form is submit
    e.preventDefault()

    //Animation of the form disapearing
    formRef.current.classList.add("m-[100%]")
    setTimeout(() => {
      setSubmited(true)
    }, 1100)

    //Checkin if the required datas are here
    if (!nameInputRef.current.value) {
      alert("You should give a name to your scan to help you find it later")
    }

    const target = domainInputRef.current.value

    if (!target.match(validationRegex)) {
      alert("Please enter a valid IP adress or a valid domain name")

      return
    }

    if (!scanOptionInputRef.current.value) {
      alert("Please choose a scan option")
    }

    //Preparing the request body with the data
    const requestBody = {
      target,
      scanOption: scanOptionInputRef.current.value,
      name: nameInputRef.current.value,
    }

    if (hostTimeoutInputRef.current?.value) {
      requestBody.hostTimeOut = hostTimeoutInputRef.current.value
    }

    if (maxRetriesInputRef.current?.value) {
      requestBody.maxRetries = maxRetriesInputRef.current.value
    }

    requestBody.showOs = showOs

    if (selectedPorts.length > 0) {
      requestBody.selectedPorts = selectedPorts
    }

    //Request
    //When a response is recieved the user is redirected to the page that show the results
    axios.post("/api/run", requestBody).then(({ data: id }) => {
      if (id != "ERROR") {
        router.push(`/seeResult/${id}`)

        return
      }

      alert(
        "OOPS it seems that an error occured!\nYou will be redirected to the history page where you will be able to see the error list"
      )
      router.push("/history")
    })
  }

  //JSX
  return (
    <>
      {submited ? (
        <>
          <Loader />
        </>
      ) : (
        <form
          className="max-w-2xl text-center mx-auto bg-slate-300 py-8 rounded-xl duration-1000"
          ref={formRef}
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          {/* First part of the form the mandatory options */}
          <div className="flex flex-col">
            {/* Domain input div */}
            <div className="mt-5 flex flex-col mx-auto">
              {/* Name div*/}
              <label htmlFor="name" className="text-4xl mb-3">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Give a name to your scan to help find it later"
                ref={nameInputRef}
                autoComplete="off"
                className="bg-slate-400 placeholder:text-white py-2 text-white rounded text-xl text-center w-[27rem] px-2  focus:bg-slate-600 duration"
              />
            </div>
            <div className="mt-5 flex flex-col mx-auto">
              {/* Domain div */}
              <label htmlFor="domain" className="text-4xl mb-3">
                Domain or IP
              </label>
              <input
                type="text"
                name="domain"
                id="domain"
                placeholder="abc.com or XXX.XXX.XXX.XXX"
                ref={domainInputRef}
                autoComplete="off"
                className="bg-slate-400 placeholder:text-white py-2 text-white rounded text-xl text-center w-[27rem] px-2 focus:bg-slate-600 duration"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col mx-auto">
            {/* Scan option div */}
            <label htmlFor="scanOption" className="text-4xl mb-2">
              Select a scan option
            </label>
            <select
              name="scanOption"
              id="scanOption"
              ref={scanOptionInputRef}
              className="text-center bg-slate-400 text-white text-2xl py-1 rounded w-[27rem] mx-[17%] focus:bg-slate-600 duration-300"
            >
              <option value="">____Select a scan option____</option>
              <option value="-sS">Syn scan</option>
              <option value="-sU">UDP scan</option>
              <option value="-sV">Version scan</option>
            </select>
          </div>
          {/* Second part of the form the optional options */}
          <div className="mt-8">
            <h2 className="text-4xl my-5 ">Options</h2>
            <div
              className={`flex align-middle justify-center items-center mt-7  ${
                timeoutEnable ? "flex-col" : "flex-row"
              }`}
            >
              {/* Host timeout div */}
              <label htmlFor="hostTimeout" className="text-2xl">
                Host Timeout
              </label>
              {
                /*
                   If the user doesn't enable the option only a checkbox apear to save space when he enable a number input apear 
                   and the user specify the number of seconds before the host is considered as timeout
                   */
                timeoutEnable ? (
                  <>
                    <input
                      type="number"
                      name="hostTimeout"
                      id="hostTimout"
                      placeholder="Timeout in seconds"
                      ref={hostTimeoutInputRef}
                      className="bg-slate-400 placeholder:text-white mx-[20%] py-2 rounded text-center mt-2 text-xl text-white focus:bg-slate-600 duration-300"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      name="checkEnableTimeout"
                      id="checkEnableTimeout"
                      onChange={(e) => {
                        setTimeoutEnable(e.target.value)
                      }}
                      className="ml-2 text-center placeholder:text-center mt-1"
                    />
                  </>
                )
              }
            </div>
            <div
              className={`mt-7 flex justify-center items-center ${
                maxRetriesEnable ? "flex-col" : ""
              }`}
            >
              {/* Max retires div */}
              <label htmlFor="max-retries" className="text-2xl">
                Max retries
              </label>
              {
                /* Same thing than the Host timeout div*/
                maxRetriesEnable ? (
                  <>
                    <input
                      type="number"
                      name="maxRetries"
                      id="maxRetries"
                      placeholder="Max retries"
                      ref={maxRetriesInputRef}
                      className="bg-slate-400 placeholder:text-white mx-[20%] py-2 rounded text-center mt-2 text-xl text-white focus:bg-slate-600 duration-300"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      name="checkEnableMaxRetries"
                      id="checkEnableMaxRetries"
                      onChange={(e) => {
                        setMaxRetriesEnable(e.target.value)
                      }}
                      className="ml-2 text-center placeholder:text-center mt-1"
                    />
                  </>
                )
              }
            </div>
            <div className="mt-7 flex justify-center items-center">
              {/* Show os div */}
              <label htmlFor="showOs" className="text-2xl">
                Show os
              </label>
              <input
                type="checkbox"
                name="showOs"
                id="showOs"
                className="mt-1 ml-2"
                onChange={toggleShowOs}
              />
            </div>

            <div
              className={`mt-7 flex justify-center items-center ${
                selectedPortsEnable ? "flex-col" : ""
              }`}
            >
              {/* Scan only selected ports div*/}
              <label htmlFor="selectedPorts" className="text-2xl">
                Scan only selected ports
              </label>
              {selectedPortsEnable ? (
                <div className="flex flex-row gap-7 items-center mt-3">
                  <input
                    type="number"
                    name="selectedPorts"
                    id="selectedPorts"
                    placeholder="Selected ports"
                    ref={selectPortInputRef}
                    min={0}
                    className="bg-slate-400 placeholder:text-white text-white py-2 rounded text-center mt-2 text-xl focus:bg-slate-600 duration-300"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-6 py-2 mt-2 rounded hover:bg-blue-600 active:bg-blue-800 duration-300"
                    onClick={handlePortAdd}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name="checkEnableSelectedPort"
                    id="checkEnableSelectedPort"
                    onChange={(e) => {
                      setSelectedPortEnable(e.target.value)
                    }}
                    className="ml-2 text-center placeholder:text-center mt-1"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col mx-[45%] gap-5 mt-5">
              {
                // DIV WITH ALL THE SELECTED PORTS
                selectedPorts.map((port, id) => (
                  <>
                    <span className="bg-blue-400 text-white w-16" key={id}>
                      {port}
                    </span>
                  </>
                ))
              }
            </div>
            {/* END OF THE SECOND PART OF THE FORM*/}
          </div>
          <input
            type="submit"
            value="Scan"
            className="mt-7 bg-blue-500 py-4 px-8 text-white rounded-md text-2xl hover:bg-blue-600 active:bg-blue-800 duration-150"
          />
        </form>
      )}
    </>
  )
}

export default ScanForm
