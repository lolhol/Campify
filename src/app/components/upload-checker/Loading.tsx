// components/Loader.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./Loading.module.css";

interface LoaderProps {
  isRequestDone: boolean;
  isRequestValid: boolean;
  redirectTo: string;
}

const Loader: React.FC<LoaderProps> = ({
  isRequestDone,
  isRequestValid,
  redirectTo,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isRequestDone) {
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 2000); // Redirect after 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [isRequestDone, router, redirectTo]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-full h-full">
        {!isRequestDone ? (
          <div className={`${styles.loader} relative w-full h-full`}>
            <div className="w-full h-full border-t-8 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div
              className="absolute top-0 left-0 w-full h-full border-t-8 border-purple-500 border-solid rounded-full animate-spin"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-full border-t-8 border-red-500 border-solid rounded-full animate-spin"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        ) : (
          <div
            className={`${isRequestValid ? "text-green-500" : "text-red-500"}`}
          >
            {isRequestValid ? (
              <FaCheckCircle className="w-full h-full" />
            ) : (
              <FaTimesCircle className="w-full h-full" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
