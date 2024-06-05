"use client";

import Image from "next/image";
import DefaultButton from "./DefaultButton";
import { ButtonProps } from "./DefaultButton";
import cx from "classnames";
import { useState, useRef, useEffect } from "react";
import css from "./Navbar.module.css";

interface NavbarProps {
  nameOfWebsite: string;
  pfpImage: ImageProps;
  buttonProps: ButtonProps;
  loggedIn: boolean;
  onClick?: () => void;
}

interface ImageProps {
  src: string;
  w: string;
  h: string;
}

export default function Navbar(props: NavbarProps) {
  const [animate, setAnimate] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (imageElement) {
      const handleAnimationEnd = () => {
        setAnimate(false);
      };

      imageElement.addEventListener("animationend", handleAnimationEnd);
      return () => {
        imageElement.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between mx-7 pt-2">
        <a className="text-4xl font-bold cursor-pointer">
          {props.nameOfWebsite}
        </a>
        <div className="flex items-center">
          <div className="w-24 h-14 text-xl font-bold">
            <DefaultButton
              content={props.buttonProps.content}
              onClick={props.buttonProps.onClick}
            />
          </div>
          <Image
            ref={imageRef}
            src={props.pfpImage.src}
            alt={"1"}
            width={10}
            height={10}
            className={cx(
              props.pfpImage.h,
              props.pfpImage.w,
              animate ? css.imageNotLoggedIn : css.image,
              "ml-10 cursor-pointer"
            )}
            onClick={() => {
              if (!props.loggedIn) {
                setAnimate(!animate);
              } else {
                if (props.onClick !== undefined) {
                  props.onClick();
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
