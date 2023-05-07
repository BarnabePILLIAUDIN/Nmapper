const ScanCard = (props) => {
  //Show all the details of a scan including its output
  //Is called by the page that show the details of a scan
  const { scanData } = props

  return (
    <div className="bg-slate-300 rounded text-center p-5 max-w-7xl flex-wrap mx-auto mt-8">
      <h2 className="text-4xl font-bold">{scanData.name}</h2>
      <h2 className="text-2xl font-semibold mt-3">Target: {scanData.target}</h2>
      <h3 className="text-2xl font-semibold mt-3">
        ScanOption {scanData.scanOption}
      </h3>
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-xl font-medium">Options</h3>
        {scanData.hostTimeOut ? (
          <>
            <h4>Host timeout:{scanData.hostTimeOut}</h4>
          </>
        ) : (
          <></>
        )}
        {scanData.maxRetries ? (
          <>
            <h4>Max retries: {scanData.maxRetries}</h4>
          </>
        ) : (
          <></>
        )}
        <h4>Show os : {scanData.showOs ? "enabled" : "disabled"}</h4>
        {scanData.selectedPorts.length > 0 ? (
          <div>
            <h4>Selected ports</h4>
            {scanData.selectedPorts.map((port, key) => (
              <span key={key}>{port}</span>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-5 overflow-auto ">
        <h4 className="text-2xl font-medium">Output: </h4>
        <pre className=" bg-slate-400 p-5 overflow-y-auto rounded-md">
          {scanData.output}
        </pre>
      </div>
    </div>
  )
}

export default ScanCard
