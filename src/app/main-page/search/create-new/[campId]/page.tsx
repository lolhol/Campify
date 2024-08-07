"use client";

import Loading from "@/app/components/upload-checker/Loading";
import ProgressBar from "@/app/components/upload-checker/ProgressBar";
import {
  UploadChecker,
  UploadCheckerHead,
  UploadCheckerMainHeaderText,
  UploadCheckerDescHeaderText,
  UploadCheckerMainTextBox,
  UploadCheckerBody,
} from "@/app/components/upload-checker/UploadChecker";
import { useEffect } from "react";

export default function UploadCheck({
  params,
}: {
  params: { campId: string };
}) {
  useEffect(() => {}, []);

  return (
    <main className="w-full h-full">
      <UploadChecker>
        <UploadCheckerHead>
          <UploadCheckerMainTextBox>
            <UploadCheckerMainHeaderText>
              Checking the camp
            </UploadCheckerMainHeaderText>
            <UploadCheckerDescHeaderText>
              Please wait while we check the camp for profane or inappropriate
              text
            </UploadCheckerDescHeaderText>
          </UploadCheckerMainTextBox>
        </UploadCheckerHead>
        <UploadCheckerBody>
          <div className="w-52 h-52">
            <Loading />
          </div>
        </UploadCheckerBody>
      </UploadChecker>
    </main>
  );
}
