"use client";

import { Ref } from "react";
import cx from "classnames";

export function CreateNewName(props: {
  className?: string;
  ref: Ref<HTMLInputElement>;
  defaultText: string;
}) {
  return (
    <input
      ref={props.ref}
      className={cx(props.className, "w-[400px] h-16 text-2xl p-2 rounded-sm")}
      placeholder={props.defaultText}
    />
  );
}
