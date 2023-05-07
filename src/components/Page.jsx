import Head from "next/head"

const Page = (props) => {
  //Componenet that set the title and the background for all the pages
  //Is called by all the pages
  const { title, children } = props

  return (
    <>
      <Head>
        {title ? (
          <title>{`Nmapper: ${title}`}</title>
        ) : (
          <title>Nmapper by Barnabé PILLIAUDIN</title>
        )}
      </Head>
      <main className="bg-slate-500 pb-16">{children}</main>
    </>
  )
}

export default Page
