"use client";

import {
  DashboardNavBar,
  NavBarButton,
  NavBarImageText,
} from "@/app/component/dashboard/DashboardNavBar";
import Image from "next/image";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import cx from "classnames";
import {
  IdentificationBox,
  IdentificationBoxComponentGroup,
  BoxImageComponent,
  BoxHeaderTextComponent,
  BoxBodyTextComponent,
} from "@/app/component/dashboard/IdentificationBox";

export default function MainDashboardPage() {
  return (
    <main>
      <IdentificationBox>
        <IdentificationBoxComponentGroup>
          <BoxImageComponent>
            <Image
              src={"/default_pfp.svg"}
              alt={"1"}
              width={500}
              height={500}
              className="w-40 rounded-full border-4"
            />
          </BoxImageComponent>
          <BoxHeaderTextComponent className="mt-5">
            Benjamin Dover
          </BoxHeaderTextComponent>
          <BoxBodyTextComponent className="mt-3">
            BenjaminDover@pinewood.edu
          </BoxBodyTextComponent>
        </IdentificationBoxComponentGroup>
      </IdentificationBox>
    </main>
  );
}
