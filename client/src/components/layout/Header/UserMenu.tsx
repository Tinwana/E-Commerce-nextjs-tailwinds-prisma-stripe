"use client";
import { Avatar } from "@/components/ui";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "./type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserMenuProps {
  currentUser: SafeUser;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  console.log(currentUser);

  // variables
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //handlers
  const toggleOpen = useCallback(() => {
    setIsOpen((pre) => !pre);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          className="cursor-pointer p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full transition hover:shadow-md text-slate-700 "
          onClick={toggleOpen}
        >
          {!currentUser?.image ? (
            <Avatar />
          ) : (
            <Avatar src={currentUser.image} />
          )}
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer ">
            {currentUser ? (
              <>
                <ul className="">
                  <li className="">
                    <Link href="/orders">
                      <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/admin">
                      <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                    </Link>
                  </li>
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      signOut({});
                      toast.success("Logged out");
                    }}
                  >
                    Log out
                  </MenuItem>
                </ul>
              </>
            ) : (
              <>
                <ul className="">
                  <li>
                    <Link href="/login">
                      <MenuItem onClick={toggleOpen}>Log In</MenuItem>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <MenuItem onClick={toggleOpen}>Register</MenuItem>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
