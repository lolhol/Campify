"use client";

import { SearchBox } from "@/app/components/find/SearchBox";
import { HeaderText } from "@/app/components/find/TextUtil";
import { Camps, CampWindow } from "@/app/components/find/CampWindow";
import { sql } from "@/internal/core";
import { useEffect, useState } from "react";
import { GetManyCamps } from "@/interfaces/response/GetManyCamps";
import { Camp } from "@/interfaces/util/Camp";
import {
  CreateNewButton,
  CreateNewButtonLinked,
  Find,
} from "@/app/components/find/Find";
import Image from "next/image";

export default function Profile() {
  const [campData, setCampData] = useState<Camp[] | null>(null);

  async function getCampData(): Promise<GetManyCamps> {
    const res = await fetch(`/api/school/db/camp/many`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  useEffect(() => {
    getCampData().then((camp) => {
      if (camp.camps.length == 0) return;
      setCampData(camp.camps);
    });
  }, []);

  return (
    <main className="w-full h-full flex flex-col">
      <Find>
        <SearchBox />
        <CreateNewButton>
          <CreateNewButtonLinked linkToGoTo={"/main-page/search/create-new"}>
            <Image
              src={"/icons/create-new.svg"}
              alt={"1"}
              width={50}
              height={50}
              className={"w-16 h-16 transition-transform hover:rotate-90"}
            />
          </CreateNewButtonLinked>
        </CreateNewButton>
      </Find>

      <Camps campList={campData ?? []} />
    </main>
  );
}
