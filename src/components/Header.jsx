"use client";
import { AlignJustify, Utensils } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import logo from "../assets/logo-v2.png"
import Image from "next/image";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handelShowmenu = () => {
    const menu = document.querySelector("#navBar-menu");
    showMenu ? menu.classList.remove("hidden") : menu.classList.add("hidden");
  };

  return (
    <div className="container py-4 relative z-[2000]">
      <div className="flex items-center justify-between">
        <div>
          {/* <h1 className="font-[600] text-[18px] md:text-[22px]">
            Menu<span>Rap</span>
          </h1> */}
          <Image src={logo} alt="logo" width={100} />
        </div>
        <div className="bg-slate-200 w-full md:w-auto  md:bg-inherit absolute top-[60px] md:static md:top-0 translate-x-[-50%] md:translate-x-0  left-[50%] md:left-">
          <ul
            id="navBar-menu"
            className="flex flex-col gap-6 md:gap-10 items-center py-10 md:py-6 md:flex-row text-[18px] "
          >
            <li>
              <a href="#" >Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
        <Button className="text-main-secondary">Start For Free</Button>
          <AlignJustify
            className="h-[30px] w-[30px] cursor-pointer md:hidden"
            onClick={() => {
                setShowMenu(!showMenu);
                handelShowmenu();
            }}
          />
        </div>
      </div>
    </div>
  );
}
