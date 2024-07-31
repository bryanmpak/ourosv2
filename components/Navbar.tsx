import { getUser } from "../app/actions/user"
import NavbarClient from "./NavbarClient"

export default async function NavbarServer() {
  const user = await getUser()
  
  return <NavbarClient user={user} />
}
