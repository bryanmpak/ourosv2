import { Suspense } from "react";
import { getUser } from "../app/actions/user";
import NavbarClient from "./NavbarClient";

async function NavbarServer() {
  const user = await getUser();
  return <NavbarClient user={user} />;
}

export default function Navbar() {
  return (
    <Suspense fallback={<div>Loading navbar...</div>}>
      {/* @ts-expect-error Server Component */}
      <NavbarServer />
    </Suspense>
  );
}
