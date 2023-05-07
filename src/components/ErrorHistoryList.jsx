const { default: ErrorCard } = require("./ErrorCard")

const ErrorHistoryList = (props) => {
  //Component that call a card for each error of it's props
  //Is called by History page

  const { data } = props

  return (
    <>
      {data.map((element, key) => (
        <ErrorCard data={element} key={key} />
      ))}
    </>
  )
}

export default ErrorHistoryList
