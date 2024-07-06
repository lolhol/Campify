import { useState } from "react";
import cx from "classnames";
import css from "./Sidebar.module.css";

export function SideBar(props: {
  children: React.ReactNode;
  className?: string;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={cx(
        "w-32 h-full flex flex-col bg-cyan-500 pt-16 relative",
        props.className
      )}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
}

export function SideBarHead(props: { children: React.ReactNode }) {
  return (
    <div className="h-16 flex flex-col items-center">{props.children}</div>
  );
}

export function SideBarBody(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("h-full", props.className)}>{props.children}</div>;
}

export function SideBarEntrees(props: { children: React.ReactNode }) {
  return <div className="h-full flex flex-col">{props.children}</div>;
}

export function SideBarEntreeSelected(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx("w-full bg-cyan-400 flex justify-center", props.className)}
    >
      {props.children}
    </div>
  );
}

export function SideBarEntreeUnselected(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "w-full bg-cyan-500 flex justify-center py-1",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function SideBarEntree(props: {
  children: React.ReactNode;
  className?: string;
  onMouseEnter: () => void;
}) {
  return (
    <div
      className={cx("w-full flex justify-center p-1 relative", props.className)}
      style={{ transition: "all 0.3s ease-in-out", zIndex: 10 }}
      onMouseEnter={props.onMouseEnter}
    >
      {props.children}
    </div>
  );
}

export function Indicator({ top }: { top: number }) {
  return (
    <div
      className={cx(
        "absolute -left-[2px] w-2 h-8 my-6 bg-cyan-200 rounded-full",
        css["sidebar-indicator"]
      )}
      style={{
        top: `${top}px`,
        zIndex: 1,
      }}
    />
  );
}
