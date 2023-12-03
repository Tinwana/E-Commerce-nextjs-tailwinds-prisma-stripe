import React from "react";
import Container from "../Container/Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16 ">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          {/* Shop categories */}
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link className="cursor-pointer" href="#">
              Phones
            </Link>
            <Link className="cursor-pointer" href="#">
              Laptops
            </Link>
            <Link className="cursor-pointer" href="#">
              Desktops
            </Link>
            <Link className="cursor-pointer" href="#">
              Watches
            </Link>
            <Link className="cursor-pointer" href="#">
              Tvs
            </Link>
            <Link className="cursor-pointer" href="#">
              Accessories
            </Link>
          </FooterList>

          {/* Customer Service */}
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link className="cursor-pointer" href="#">
              Contact us
            </Link>
            <Link className="cursor-pointer" href="#">
              Shipping Policy
            </Link>
            <Link className="cursor-pointer" href="#">
              Returns & Exchanges
            </Link>
            <Link className="cursor-pointer" href="#">
              Watches
            </Link>
            <Link className="cursor-pointer" href="#">
              FAGs
            </Link>
          </FooterList>

          {/* About Us */}
          <FooterList>
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="">
              All our electronics store, we one dedicates to proving the latest
              and the greatest devices and accessories to our customers, with a
              wide selection of phones, tvs, laptops, watches, and accessories
            </p>
            <p>&Copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
          </FooterList>

          {/* About Us */}
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
