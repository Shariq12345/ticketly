import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./search-bar";
import { PlusCircle, Ticket } from "lucide-react";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            href="/"
            className="font-bold shrink-0 flex justify-center items-center"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={20}
              height={20}
              className="w-6 lg:w-8"
            />
            <h1 className="text-lg lg:text-xl ml-2">Ticketly</h1>
          </Link>

          {/* MOBILE */}
          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block ml-auto">
          <SignedIn>
            <div className="flex items-center gap-3">
              <Link href={"/seller"}>
                <button className="flex items-center bg-orange-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-orange-700 transition">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Sell Tickets
                </button>
              </Link>

              <Link href={"/tickets"}>
                <button className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  <Ticket className="w-4 h-4 mr-2" />
                  My Tickets
                </button>
              </Link>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden w-full flex justify-center gap-3">
          <SignedIn>
            <Link href={"/seller"} className="flex-1">
              <button className="w-full bg-orange-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-orange-700 transition">
                Sell Tickets
              </button>
            </Link>

            <Link href={"/tickets"} className="flex-1">
              <button className="w-full bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                My Tickets
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
