import Header from "./Header"
import Navbar from "./Navbar"
import { ReactNode, useContext } from "react"
import { Context } from "./UserContext"

type Props = {
  children?: ReactNode
  // importing type "ReactNode" seems to have solved the 'intrinsic elements // returns obj // etc' errors
}

const Layout = ({ children }: Props) => {
  const { user } = useContext(Context)

  const toggleBg =
    user === "pak"
      ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"
      : "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"

  const toggleTheme = user === "pak" ? "theme-pak" : "theme-mar"

  return (
    <div className={`${toggleBg} ${toggleTheme} h-full`}>
      <div className="max-w-xl flex flex-col m-auto  min-h-full">
        <Header />
        <div className="grow px-6">{children}</div>
        <div className="flex-end px-2 py-4">
          <Navbar />
        </div>
      </div>
    </div>
  )
}

export default Layout
