"use client";

import cx from "classnames";
import Image from "next/image";
import { TextWithImageLeft } from "@/app/components/text/TextDecorations";
import Link from "next/link";
import { Camp } from "@/interfaces/util/Camp";

export function Camps(props: { campList: Camp[] }) {
  return (
    <div className="w-full h-full mt-16 grow">
      <div className="flex flex-wrap flex-row gap-x-10 justify-between w-full px-20">
        {props.campList.map((item, index) => (
          <div className="mb-10">
            <CampWindow key={index} id={item.id}>
              <CampWindowHead>
                <CampHeader>
                  <CampWindowHeaderText>{item.name}</CampWindowHeaderText>
                  <CampWindowDescriptionText>
                    {item.short_description}
                  </CampWindowDescriptionText>
                </CampHeader>
              </CampWindowHead>
              <CampWindowBody>
                {item.image && (
                  <Image
                    src={"data:image/jpeg;base64," + item.image}
                    alt={"1"}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="w-auto h-full overflow-hidden"
                  />
                )}
              </CampWindowBody>
              <CampWindowBase>
                <CampWindowList>
                  <TextWithImageLeft>
                    <Image
                      src={"/icons/like.png"}
                      alt={"1"}
                      width={48}
                      height={48}
                      className="w-10 h-10"
                    />
                    <CampWindowHeaderText>{item.likes}</CampWindowHeaderText>
                  </TextWithImageLeft>
                  <TextWithImageLeft className={"ml-10"}>
                    <Image
                      src={"/icons/comment.png"}
                      alt={"1"}
                      width={50}
                      height={50}
                      className="w-10 h-10"
                    />
                    <CampWindowHeaderText>{item.comments}</CampWindowHeaderText>
                  </TextWithImageLeft>
                </CampWindowList>
              </CampWindowBase>
            </CampWindow>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CampWindow(props: {
  className?: string;
  id: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={cx(
        props.className,
        "w-96 h-[500px] rounded-lg bg-white shadow-md p-5 flex flex-col cursor-pointer"
      )}
      href={`/main-page/search/${props.id}`}
    >
      {props.children}
    </Link>
  );
}

export function CampWindowHead(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx(props.className, "w-full h-1/5")}>{props.children}</div>
  );
}

export function CampHeader(props: {
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}) {
  return (
    <div className={cx(props.className, "flex flex-col")}>{props.children}</div>
  );
}

export function CampWindowHeaderText(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx(props.className, "text-lg font-bold")}>
      {props.children}
    </div>
  );
}

export function CampWindowDescriptionText(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx(props.className, "text-md opacity-75")}>
      {props.children}
    </div>
  );
}

export function CampWindowBody(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx("w-full h-3/5 overflow-hidden relative", props.className)}
    >
      {props.children}
    </div>
  );
}

export function CampWindowBase(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        props.className,
        "w-full h-1/5 flex flex-col justify-center"
      )}
    >
      {props.children}
    </div>
  );
}

export function CampWindowList(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx(props.className, "flex mt-5")}>{props.children}</div>
  );
}
