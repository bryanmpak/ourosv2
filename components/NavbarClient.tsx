"use client";

import Link from "next/link";
import { Icons } from "./Icons";
import React from "react";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useAccountLinkStore } from "../hooks/useAccountLinkStore";
import { User } from "@prisma/client";
import { cn } from "../utils/utils";
import { UrlObject } from "url";

type NavbarProps = {
  user: User | null | undefined;
};

export default function NavbarClient({ user }: NavbarProps) {
  const pathname = usePathname();
  const navLinks = ["home", "pomodoro", "mail", "write", "habits"]; // , "momentos"
  const accountLink = useAccountLinkStore();
  const { user: clerkUser, isLoaded: isClerkUserLoaded } = useUser();

  const currentHost = typeof window !== "undefined" ? window.location.host : "";

  const navEl = navLinks.map((link, i) => {
    let href: string | UrlObject;
    let isActive: boolean;

    if (link === "home") {
      href = "/";
      isActive = pathname === "/";
    } else if (link === "habits") {
      href = {
        pathname: "/",
        host: `habits.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      };
      isActive = currentHost.startsWith("habits.");
    } else {
      href = `/${link}`;
      isActive = pathname === `/${link}`;
    }

    return (
      <Link
        key={i}
        href={href}
        className={cn(
          "flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1",
          isActive && "ring-[0.75px] ring-text"
        )}
      >
        {React.createElement(Icons[link])}
        {isActive && (
          <div className="w-[3px] h-[3px] rounded-full bg-title mt-[1px]"></div>
        )}
      </Link>
    );
  });

  const authModalButtons = (
    <>
      {!clerkUser && (
        <SignInButton mode="modal">
          <button className="flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1">
            {React.createElement(Icons["signIn"])}
          </button>
        </SignInButton>
      )}
      {clerkUser && user && !user.isAccountLinked && (
        <button
          onClick={accountLink.onOpen}
          className="flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1"
        >
          {React.createElement(Icons["link"])}
        </button>
      )}
      {clerkUser && <UserButton />}
    </>
  );

  return (
    <nav className="flex h-[60px] justify-evenly items-center m-auto rounded-2xl bg-nav_bg border-2 border-neutral">
      {navEl}
      <div className="w-[1px] h-10 bg-neutral mx-2"></div>
      {authModalButtons}
    </nav>
  );
}
