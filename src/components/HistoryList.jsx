import ScanHistoryCard from "./ScanHistoryCard"

const HistoryList = (props) => {
  //Component that call a card for each scan of it's props
  //Is called by History page
  const { data } = props

  return (
    <div className="flex gap-16 flex-col max-w-xl mx-auto mt-7">
      {data.map((element, id) => (
        <ScanHistoryCard scanData={element} key={id} />
      ))}
    </div>
  )
}

export default HistoryList
