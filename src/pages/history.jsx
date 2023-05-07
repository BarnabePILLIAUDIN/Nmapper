import ErrorHistoryList from "@/components/ErrorHistoryList"
import Header from "@/components/Header"
import HistoryList from "@/components/HistoryList"
import Page from "@/components/Page"
import axios from "axios"
import { useEffect, useState } from "react"

const History = () => {
  // History page show the scan and the errors
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [seeErrors, setSeeError] = useState(false)

  const toggleSeeErrors = () => {
    setSeeError(!seeErrors)
  }

  useEffect(() => {
    if (!seeErrors) {
      axios.get("/api/history").then(({ data: { data } }) => {
        if (!search) {
          setData(data)

          return
        }

        const matchSearch = data.filter((element) =>
          element.name.includes(search)
        )
        setData(matchSearch)
      })

      return
    }

    axios.get("/api/getErrors").then(({ data: { data } }) => {
      setData(data)
    })
  }, [search, seeErrors])

  return (
    <Page title="history">
      <Header></Header>
      {seeErrors ? (
        <div>
          <button
            onClick={toggleSeeErrors}
            className="block mx-auto mt-5 text-2xl text-white bg-slate-600 py-2 px-4 rounded-md hover:bg-slate-700 active:bg-slate-800 duration-300"
          >
            Go back to history
          </button>
          <ErrorHistoryList data={data} />
        </div>
      ) : (
        <div>
          <h3 className="text-center text-white text-2xl font-medium mt-9">
            Your scan isn't in the the depite an empty research it may have been
            an error
          </h3>
          <button
            onClick={toggleSeeErrors}
            className="block mx-auto mt-5 text-2xl text-white bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-800 duration-300"
          >
            Check the Error list{" "}
          </button>
          <input
            type="text"
            className="mx-[35%] w-[30%] mt-7 py-3 bg-slate-600 rounded text-white text-center placeholder:text-center placeholder:text-white text-2xl font-medium focus:bg-slate-800"
            placeholder="Search by name"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <HistoryList data={data}></HistoryList>
        </div>
      )}
    </Page>
  )
}

export default History
