import Header from "./Header"
import Navbar from "./Navbar"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  // importing type "ReactNode" seems to have solved the 'intrinsic elements // returns obj // etc' errors
}

const Layout: React.FC = ({ children }: Props) => {
  const bgColor: string =
    "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"

  return (
    <div className={`${bgColor} h-screen w-screen theme-pak`}>
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
