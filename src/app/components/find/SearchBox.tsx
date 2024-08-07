"use client";

import React from "react";
import Select from "react-select";
import cx from "classnames";

const options = [{ value: "1", label: "1" }];

export function FindWindow(props: { className?: string }) {
  return (
    <div className="w-full flex justify-center mt-10">
      <Select
        className={cx(props.className, "w-full h-full mx-20")}
        styles={{
          control: (styles) => ({
            ...styles,
            cursor: "text",
          }),
          valueContainer: (provided, state) => ({
            ...provided,
            height: "50px",
          }),
          input: (base) => ({
            ...base,
            fontSize: "20px",
          }),
        }}
        placeholder="Search ..."
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
}
