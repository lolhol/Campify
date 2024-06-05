"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

interface TextDecorationsProps {
  children: React.ReactNode;
  className?: string;
}

export function HighlightedText(props: TextDecorationsProps) {
  return (
    <div className={cx("inline bg-yellow-200", props.className)}>
      {props.children}
    </div>
  );
}

export function LinkText(props: TextDecorationsProps & { href: string }) {
  return (
    <a
      href={props.href}
      className={cx("inline underline decoration-blue-800", props.className)}
    >
      {props.children}
    </a>
  );
}

export function SwitchTextFont(
  props: TextDecorationsProps & { fonts: string[] }
) {
  const [iterationCount, setIterationCount] = useState(0);
  const [curTextIndex, setCurTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTextIndex((prevIndex) => (prevIndex + 1) % props.fonts.length);
      setIterationCount((prevCount) => prevCount + 1);
    }, 500);

    if (iterationCount >= 5) clearInterval(interval);

    return () => clearInterval(interval);
  }, [iterationCount]);

  return (
    <a className={cx(props.fonts[curTextIndex], props.className)}>
      {props.children}
    </a>
  );
}
