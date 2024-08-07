"use client";

import { ReactNode, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useDeleteComment } from "@liveblocks/react";
import { createClient } from "@liveblocks/core";
import { client } from "@/app/main-page/search/camp-item/liveblocks";

export function Room({
  children,
  chat_id,
}: {
  children: ReactNode;
  chat_id: string;
}) {
  const client = createClient({
    publicApiKey:
      "pk_prod_Bp7SldOdLpuGgvzJppQt0UyxMyH9wagU5MdIeL6OyqZ3JuyqELI5hIH2hYtw_RrN",
  });
  useEffect(() => {
    const unsubscribe = client
      .getRoom(chat_id)
      ?.events.comments.subscribe((event) => {
        console.log(event + "!!!!!!!");
      });
  }, [client]);

  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_prod_Bp7SldOdLpuGgvzJppQt0UyxMyH9wagU5MdIeL6OyqZ3JuyqELI5hIH2hYtw_RrN"
      }
    >
      <RoomProvider id={chat_id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
