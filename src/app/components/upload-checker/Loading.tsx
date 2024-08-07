import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-full h-full">
        <div className="w-full h-full border-t-8 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
