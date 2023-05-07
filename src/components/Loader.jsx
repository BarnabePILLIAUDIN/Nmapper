import { useEffect, useRef } from "react"

const Loader = () => {
  //Is called when the form is submited but the scan isn't over
  //Is called by the ScanForm component
  const loaderRef = useRef(null)
  const toogleMargin = () => {
    loaderRef.current?.classList.toggle("mt-[35rem]")
    setTimeout(toogleMargin, 3000)
  }

  //need this to avoid that the useEffect being executed twice and brake the animation
  let called = 0

  useEffect(() => {
    if (called === 0) {
      called++

      toogleMargin()
    }
  }, [])

  return (
    <div>
      <h2
        className={`text-8xl text-center text-white text-bold duration-[3000ms]`}
        ref={loaderRef}
      >
        Please wait
      </h2>
    </div>
  )
}

export default Loader
