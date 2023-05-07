import Header from "@/components/Header"
import Page from "@/components/Page"
import ScanCard from "@/components/ScanCard"
import axios from "axios"
import { useEffect, useState } from "react"

export const getServerSideProps = async (ctx) => {
  const { scanId } = ctx.query

  return {
    props: {
      scanId,
    },
  }
}

const ShowScanResult = (props) => {
  //Page that show the result of a scan
  const { scanId } = props
  const [scan, setScan] = useState({})

  useEffect(() => {
    axios.get(`/api/getScanById/${scanId}`).then(({ data: { scan } }) => {
      setScan(scan)
    })
  }, [])

  return (
    <Page>
      <Header></Header>
      {scan.target ? (
        <ScanCard scanData={scan}></ScanCard>
      ) : (
        <>
          {/*Custom 404 error when the id is not correct  */}
          <h2 className="text-red-600 text-center mt-10 text-4xl font-bold">
            404 SCAN NOT FOUND
          </h2>
        </>
      )}
    </Page>
  )
}

export default ShowScanResult
