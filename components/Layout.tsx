import Header from "./Header"
import Navbar from "./Navbar"
import { ReactNode, useContext } from "react"
import { Context } from "./UserContext"
import { useDynamicHeight } from "../lib/useDynamicHeight"

type Props = {
  children?: ReactNode
  // importing type "ReactNode" seems to have solved the 'intrinsic elements // returns obj // etc' errors
}

const Layout = ({ children }: Props) => {
  const { user } = useContext(Context)
  const { containerRef, containerHeight } = useDynamicHeight(0)

  const toggleBg =
    user === "pak"
      ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"
      : "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"

  const toggleTheme = user === "pak" ? "theme-pak" : "theme-mar"

  return (
    <div className={`${toggleBg} ${toggleTheme}`}>
      <div
        className={`max-w-xl flex flex-col m-auto p-4 min-h-screen h-[${containerHeight}px]`}
        ref={containerRef}
      >
        <Header />
        <div className="grow px-4">{children}</div>
        <div className="flex-end p-4">
          <Navbar />
        </div>
      </div>
    </div>
  )
}

export default Layout
