import React from "react";
import Container from "../Container/Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCounter from "./CartCounter";
import UserMenu from "./UserMenu";
import currentUser from "@/actions/getCurrentUser";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Header: React.FC = async () => {
  const currentUserNextAuth = await currentUser.getCurrentUser();

  return (
    <header className="sticky top-0 w-full bg-slate-200 z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0 ">
            <Link
              className={`${redressed.className} font-bold text-2xl`}
              href="/"
            >
              E-shop
            </Link>
            <div className="hidden md:block">Search Bar</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCounter />
              <UserMenu currentUser={currentUserNextAuth} />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
