"use client";

import Image from "next/image";
import cx from "classnames";

interface FooterProps {
  marginTop?: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div
      className={cx(props.marginTop, "w-full h-full")}
      style={{
        backgroundImage: `url('/Footer.svg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-between h-full lg:mx-32 md:mx-5 sm:mx-3">
        <div
          className={cx("w-44 sm:w-40 text-white opacity-50 mt-10 text-[11px]")}
        >
          ©️ Pinewood school approved
        </div>
        <div className="flex lg:w-96 md:w-92 sm:w-72 w-72 text-base font-inter text-white justify-between mt-10">
          <a>Product</a>
          <a>Features</a>
          <a>Benefits</a>
          <a>Team</a>
        </div>

        <button className="rounded-xl lg:w-40 md:w-40 lg:h-12 md:h-12 h-10 w-36 sm:w-36 bg-yellow-400 text-black-pearl font-black font-inter text-xl mt-10">
          Contact
        </button>
      </div>
    </div>
  );
}
