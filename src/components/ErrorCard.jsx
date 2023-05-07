const ErrorCard = ({ data }) => {
  // Componenent for the errors in the history menu
  //Is called by ErrorHistoryList
  const {
    name,
    target,
    scanOption,
    hostTimeOut,
    maxRetries,
    selectedPorts,
    showOs,
    output,
  } = data

  return (
    <div className="bg-red-300 rounded text-center p-5 max-w-7xl flex-wrap mx-auto mt-8">
      <h2 className="text-4xl font-bold">{name}</h2>
      <h2 className="text-2xl font-semibold mt-3">Target: {target}</h2>
      <h3 className="text-2xl font-semibold mt-3">ScanOption {scanOption}</h3>
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-xl font-medium">Options</h3>
        {hostTimeOut ? (
          <>
            <h4>Host timeout:{hostTimeOut}</h4>
          </>
        ) : (
          <></>
        )}
        {maxRetries ? (
          <>
            <h4>Max retries: {maxRetries}</h4>
          </>
        ) : (
          <></>
        )}
        <h4>Show os : {showOs ? "enabled" : "disabled"}</h4>
        {selectedPorts.length > 0 ? (
          <div>
            <h4>Selected ports</h4>
            {selectedPorts.map((port, key) => (
              <span key={key}>{port}</span>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-5 overflow-auto ">
        <h4 className="text-2xl font-medium">Output: </h4>
        <pre className=" bg-red-600 p-5 overflow-y-auto rounded-md text-white">
          {output}
        </pre>
      </div>
    </div>
  )
}
export default ErrorCard
