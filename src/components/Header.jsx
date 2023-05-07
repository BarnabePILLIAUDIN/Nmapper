import Link from "next/link"

const Header = () => {
  //Header with the title and the navbar
  //Is called by all the pages
  return (
    <nav className="flex justify-evenly py-12 border-b-4 mb-12 border-white items-center text-white bg-slate-500">
      <h1 className=" text-6xl font-bold">Welcome to Nmapper!</h1>
      <ul className="flex gap-24">
        <li>
          <Link href="/" className="text-4xl font-semibold hover:border-b-2">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/history"
            className="text-4xl font-semibold  hover:border-b-2"
          >
            History
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
