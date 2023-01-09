import Header from "./Header"
import Navbar from "./Navbar"
import { ReactNode, useContext } from "react"
import { Context } from "./UserContext"

type Props = {
  children?: ReactNode
  // importing type "ReactNode" seems to have solved the 'intrinsic elements // returns obj // etc' errors
}

const Layout: React.FC = ({ children }: Props) => {
  const { user } = useContext(Context)

  const toggleBg =
    user === "pak"
      ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"
      : "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"

  const toggleTheme = user === "pak" ? "theme-pak" : "theme-mar"

  return (
    <div className={`${toggleBg} ${toggleTheme}`}>
      <div className="max-w-xl flex flex-col m-auto h-screen p-4">
        <Header />
        <div className="grow p-4">{children}</div>
        <div className="flex-end p-4">
          <Navbar />
        </div>
      </div>
    </div>
  )
}

export default Layout
