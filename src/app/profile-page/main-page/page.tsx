"use client";

import {
  SideBar,
  SideBarBody,
  SideBarEntree,
  SideBarEntrees,
  SideBarEntreeSelected,
  SideBarEntreeUnselected,
  SideBarHead,
  Indicator,
} from "@/app/component/dashboard/sidebar/Sidebar";
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleMouseEnterUpdate = (index: number) => {
    setIndicatorPosition(index * 80); // Adjust the multiplier to match your menu item height
  };

  const handleMouseLeaveUpdateToDefault = () => {
    setIndicatorPosition(0);
  };

  return (
    <main className="w-full h-screen flex">
      <div className="h-full">
        <SideBar
          className="flex flex-col"
          onMouseLeave={handleMouseLeaveUpdateToDefault}
        >
          <SideBarHead>
            <Image
              src={"/default_pfp.svg"}
              alt={"1"}
              width={1000}
              height={1000}
              className="w-16 h-16 border-black"
            />
          </SideBarHead>
          <SideBarBody className="mt-10 relative">
            <SideBarEntrees>
              {["home", "find", "settings", "profile"].map((item, index) => (
                <SideBarEntree
                  key={item}
                  className="cursor-pointer relative my-2"
                  onMouseEnter={() => handleMouseEnterUpdate(index)}
                >
                  <Image
                    src={`/icons/${item.toLowerCase()}.svg`}
                    alt={item}
                    width={50}
                    height={50}
                    className="w-14 h-14 cursor-pointer"
                  />
                </SideBarEntree>
              ))}
            </SideBarEntrees>
            <Indicator top={indicatorPosition} />
          </SideBarBody>
        </SideBar>
      </div>
      <div className="w-full h-full bg-[#e6f4fc]"></div>
    </main>
  );
}
