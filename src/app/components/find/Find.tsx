"use client";

import cx from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

export function Find(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cx(props.className, "flex w-full items-center mt-12 px-5")}>
      {props.children}
    </div>
  );
}

export function CreateNewButtonLinked(props: {
  className?: string;
  children: ReactNode;
  linkToGoTo: string;
}) {
  return (
    <Link className={props.className} href={props.linkToGoTo}>
      {props.children}
    </Link>
  );
}

export function CreateNewButton(props: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx(props.className, "w-16 h-16 ml-5")}>
      {props.children}
    </div>
  );
}
