import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const navPath = [
    {
      id: 1,
      name: "home",
      url: "/",
    },
    {
      id: 2,
      name: "personal",
      url: "/home",
    },
    {
      id: 3,
      name: "create",
      url: "/create",
    },
  ];
  return (
    <div className="flex w-full h-[60px] border-b items-center justify-center">
      <div className="h-full flex w-[90%] justify-between items-center">
        <div className="flex items-center gap-10">
          <p>Logo</p>

          <div>
            {navPath.map((nav) => (
              <Link
                href={nav.url}
                key={nav.id}
                className="py-2 px-4 border rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 mx-2 text-[12px] uppercase font-semibold"
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
