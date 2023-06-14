import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()
  const activeMarker: string = "w-[3px] h-[3px] rounded-full bg-light mt-[1px]"
  const linkCSS: string =
    "flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl flex justify-center items-center hover:-translate-y-2 duration-300 active:translate-y-2"

  return (
    <nav
      className={
        "flex w-11/12 h-[60px] justify-evenly items-center m-auto rounded-2xl bg-nav_bg border-2 border-neutral"
      }
    >
      <Link href="/" className={linkCSS}>
        {/* probably can DRY the <svg> for all links */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        {router.pathname === "/" ? <div className={activeMarker}></div> : null}
      </Link>
      <Link href="/timer" className={linkCSS}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {router.pathname === "/timer" ? (
          <div className={activeMarker}></div>
        ) : null}
      </Link>
      <Link href="mail" className={linkCSS}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        {router.pathname === "/mail" ? (
          <div className={activeMarker}></div>
        ) : null}
      </Link>
      <Link href="write" className={linkCSS}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          />
        </svg>
        {router.pathname === "/write" ? (
          <div className={activeMarker}></div>
        ) : null}
      </Link>
      {/* <Link href="goals" className={linkCSS}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
          />
          <polyline points="9 11 12 14 22 4" />
        </svg>
        {router.pathname === "/goals" ? (
          <div className={activeMarker}></div>
        ) : null}
      </Link> */}
    </nav>
  )
}
