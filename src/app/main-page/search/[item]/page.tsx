"use client";

import {
  CampItem,
  CampItemContent,
  CampItemDividerLine,
  CampItemHead,
  CampItemHeaderText,
  CampItemTag,
  ChatHeaderNameText,
  ChatItemChatInfo,
  ChatItemEntry,
  ChatItemImage,
  ChatItemProducerInformation,
  ChatMediumNameText,
  HeaderBody,
  HeaderDescriptionText,
  HeaderTagGroup,
  VerticalLine,
} from "@/app/components/camp-item/CampItem";
import { CampItemChat } from "@/app/components/camp-item/CampItem";
import Image from "next/image";
import { Room } from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Camp {
  id: number;
  likes: number;
  comments: number;
  description: string;
  name: string;
  image_url: string | null;
}

// TODO: add chat functionality
export default function Profile() {
  const [campData, setCampData] = useState<Camp | null>(null);
  const searchParams = useSearchParams();
  const campID = parseInt(searchParams.get("id") ?? "");

  async function getCampData(id: number): Promise<Camp> {
    const res = await fetch(`/api/school/db/camp/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch camp data");
    }
    return await res.json();
  }
  useEffect(() => {
    async function fetchCampData() {
      if (campID) {
        const data = await getCampData(campID);
        setCampData(data);
      }
    }
    fetchCampData();
  }, [campID]);

  const name = "Test Camp"; // TODO: make an api for this.
  const description =
    "Nestled in the heart of the great outdoors, Adventure Camp offers an unparalleled experience for thrill-seekers and nature enthusiasts alike. Our diverse range of activities caters to all interests and skill levels, ensuring every camper finds their perfect adventure. From rock climbing and zip-lining to serene nature hikes and canoeing on a tranquil lake, there's something for everyone. Our dedicated team of experienced guides ensures a safe and exciting environment, encouraging campers to step out of their comfort zones and create lasting memories. Join us at Adventure Camp for a journey of discovery, challenge, and endless fun.";
  const sampleTags = ["#someTag", "#anotherTag"];

  return (
    <main className="w-full h-full flex">
      <CampItem>
        <CampItemContent>
          <CampItemHead>
            <CampItemHeaderText>
              {!campData ? " " : campData.name}
            </CampItemHeaderText>
            <HeaderBody className="mt-12">
              <HeaderTagGroup className="mb-1">
                {sampleTags.map((tag, index) => (
                  <CampItemTag key={index}>{tag}</CampItemTag>
                ))}
              </HeaderTagGroup>
              <HeaderDescriptionText className="mt-2">
                {!campData ? " " : campData.description}
              </HeaderDescriptionText>
            </HeaderBody>
          </CampItemHead>
        </CampItemContent>
        <VerticalLine />
        <CampItemChat>
          <Room chat_id={campID.toString()}>
            <CollaborativeApp />
          </Room>
        </CampItemChat>
      </CampItem>
    </main>
  );
}

/*
 */
