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
  EditBox,
} from "@/app/component/dashboard/IdentificationBox";
import { useEffect, useRef, useState } from "react";
import { ImageWithEditButton } from "@/app/component/dashboard/DashboardUtil";
import { useRouter } from "next/navigation";
import { OnTextCopyAnimation } from "@/app/component/util/AnimationUtil";
import { CopyText } from "../../component/dashboard/IdentificationBox";
import {
  HeadText,
  MainStatistics,
  MainStatisticsBody,
  StatisticsWheel,
} from "@/app/component/dashboard/MainStatistics";
import { MainStatisticsHead } from "../../component/dashboard/MainStatistics";

export default function MainDashboardPage() {
  const [profilePic, setProfilePic] = useState<boolean>(false);
  const [isHoveringPfp, setIsHoveringPfp] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const [profileAboutMe, setProfileAboutMe] = useState<string>("");
  const [clickAboutMe, setClickAboutMe] = useState<boolean>(false);
  const router = useRouter();
  const [copied, setCopied] = useState<boolean>(false);

  function copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
  }

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
                    className="w-64 rounded-full border-4"
                  />
                </BoxImageComponent>
                <BoxHeaderTextComponent className="mt-5">
                  Benjamin Dover
                </BoxHeaderTextComponent>
                <RegularText className="ml-1 text-xl font-medium flex select-none">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      copyToClipboard("@benjaminbover"); /// TODO: THIS NEEDS TO BE REPLACED
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    }}
                  >
                    @benjaminbover
                  </a>
                  {copied && <CopyText>Copied!</CopyText>}
                </RegularText>
                <div className="flex flex-col mt-5">
                  <BoxBodyTextComponent className="ml-1">
                    Member since Jun 4, 2024
                  </BoxBodyTextComponent>
                  <BoxBodyTextComponent className="ml-1">
                    BenjaminDover@pinewood.edu
                  </BoxBodyTextComponent>
                </div>
                <LineSeparator className="mt-3" />
                <AccountAboutMeComponent
                  className="mt-3"
                  onClick={() => {
                    setClickAboutMe(true);
                  }}
                >
                  <RegularText className="text-md font-semibold">
                    About Me:
                  </RegularText>
                  <RegularText>
                    {(clickAboutMe && (
                      <EditBox
                        className="ml-1"
                        onSubmit={(e: string | null) => {
                          setClickAboutMe(false);
                          if (e == null) return;
                          setProfileAboutMe(e);
                        }}
                        defaultValue={profileAboutMe}
                      />
                    )) || (
                      <a>
                        {profileAboutMe == ""
                          ? "Click here to edit"
                          : profileAboutMe}
                      </a>
                    )}
                  </RegularText>
                </AccountAboutMeComponent>
              </IdentificationBoxComponentGroup>
            </IdentificationBox>

            <MainStatistics
              className={cx(css.onOverProfilePage)}
              hovering={isHoveringPfp[1]}
              onMouseEnter={() => setIsHoveringPfp([isHoveringPfp[0], true])}
              onMouseLeave={() => setIsHoveringPfp([isHoveringPfp[0], false])}
            >
              <MainStatisticsBody>
                <StatisticsWheel
                  percents={[20, 10, 15, 10, 5, 3, 2]}
                ></StatisticsWheel>
              </MainStatisticsBody>
            </MainStatistics>
          </div>
        </div>
      </div>
    </main>
  );
}
