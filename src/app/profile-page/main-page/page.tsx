"use client";

import {
  DashboardNavBar,
  NavBarButton,
  NavBarImageText,
  NavBarMainText,
} from "@/app/component/dashboard/DashboardNavBar";
import Image from "next/image";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import cx from "classnames";
import {
  IdentificationBox,
  IdentificationBoxComponentGroup,
  BoxImageComponent,
  BoxHeaderTextComponent,
  BoxBodyTextComponent,
  LineSeparator,
  LineSeparatorWithText,
  TextWithImageLeft,
  RegularText,
  AccountAboutMeComponent,
} from "@/app/component/dashboard/IdentificationBox";
import { useEffect, useRef, useState } from "react";
import { ImageWithEditButton } from "@/app/component/dashboard/DashboardUtil";
import { useRouter } from "next/navigation";

export default function MainDashboardPage() {
  const [profilePic, setProfilePic] = useState<boolean>(false);
  const [isHoveringPfp, setIsHoveringPfp] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const router = useRouter();

  return (
    <main className="bg-slate-100 w-full h-screen">
      <div className="h-full w-full flex flex-col">
        <DashboardNavBar className="h-12 mt-1">
          <NavBarMainText>
            <a
              className="cursor-pointer"
              onClick={() => {
                console.log("redirecting");
                router.push("/");
              }}
            >
              Campify
            </a>
          </NavBarMainText>
        </DashboardNavBar>

        <div className="ml-5 h-full mt-5 mb-5">
          <div className="flex h-full">
            <IdentificationBox
              className={cx(
                isHoveringPfp[0] ? "shadow-2xl" : "shadow-lg",
                css.onOverProfilePage
              )}
              onMouseEnter={() => setIsHoveringPfp([true, isHoveringPfp[1]])}
              onMouseLeave={() => setIsHoveringPfp([false, isHoveringPfp[1]])}
            >
              <IdentificationBoxComponentGroup>
                <BoxImageComponent>
                  <Image
                    src={"/default_pfp.svg"}
                    alt={"1"}
                    width={500}
                    height={500}
                    className="w-40 rounded-full border-4"
                  />
                </BoxImageComponent>
                <BoxHeaderTextComponent className="mt-5">
                  Benjamin Dover
                </BoxHeaderTextComponent>
                <BoxBodyTextComponent className="mt-2">
                  BenjaminDover@pinewood.edu
                </BoxBodyTextComponent>
                <LineSeparator className="mt-3" />
                <TextWithImageLeft
                  className="mt-3"
                  onMouseEnterImage={() => setProfilePic(true)}
                  onMouseLeaveImage={() => setProfilePic(false)}
                  onImageClick={() => {
                    /*REDIRECT TO PFP CHANGE MENU*/
                  }}
                >
                  {!profilePic ? (
                    <Image
                      src={"/default_pfp.svg"}
                      alt={"1"}
                      width={500}
                      height={500}
                      className="h-full w-fit"
                    />
                  ) : (
                    <ImageWithEditButton>
                      <Image
                        src={"/default_pfp.svg"}
                        alt={"1"}
                        width={500}
                        height={500}
                        className="h-full w-fit rounded-full border-2 border-black"
                      />
                    </ImageWithEditButton>
                  )}
                  <a className="cursor-pointer" onClick={() => {}}>
                    benjaminbover
                  </a>
                </TextWithImageLeft>
                <AccountAboutMeComponent className="mt-3">
                  <RegularText className="text-md font-semibold">
                    About Me:
                  </RegularText>
                  <RegularText>
                    Welcome to my personal page! This is the About Me section
                    where you can learn more about who I am, what I do, and what
                    drives me.
                  </RegularText>
                </AccountAboutMeComponent>
              </IdentificationBoxComponentGroup>
            </IdentificationBox>

            <div
              className={cx(
                isHoveringPfp[1] ? "shadow-2xl" : "shadow-lg",
                "w-full bg-white mx-9 rounded-xl",
                css.onOverProfilePage
              )}
              onMouseEnter={() => setIsHoveringPfp([isHoveringPfp[0], true])}
              onMouseLeave={() => setIsHoveringPfp([isHoveringPfp[0], false])}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
