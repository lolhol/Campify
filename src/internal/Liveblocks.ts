import { MessageIdentification } from "@/interfaces/request/ProfanityFilter";

export class Liveblocks {
  constructor(public key: string) {}
  public async deleteComment({
    roomId,
    threadId,
    commentId,
  }: MessageIdentification) {
    const _ = await fetch(
      `https://api.liveblocks.io/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.key}`,
        },
      },
    );
  }

  public async getComment({
    roomId,
    threadId,
    commentId,
  }: MessageIdentification) {
    const response = await fetch(
      `https://api.liveblocks.io/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.key}`,
        },
      },
    );

    return await response.json();
  }
}
