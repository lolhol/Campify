"use client";

import cx from "classnames";

export function IdentificationBox(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(props.className, "w-40 h-full")}>{props.children}</div>
  );
}

function DefaultTextComponent(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("w-full h-1/3 flex", props.className)}>
      {props.children}
    </div>
  );
}

export function IdentificationBoxComponentGroup(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(props.className, "flex flex-col")}>{props.children}</div>
  );
}

export function BoxHeaderTextComponent(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return DefaultTextComponent({
    children: props.children,
    className: props.className + " text-5xl",
  });
}

export function BoxBodyTextComponent(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return DefaultTextComponent({
    children: props.children,
    className: props.className + " opacity-70",
  });
}

export function BoxImageComponent(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("w-full", props.className)}>{props.children}</div>;
}
