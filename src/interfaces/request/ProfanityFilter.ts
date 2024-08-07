export interface ProfanityFilterRequest {
  message: MessageIdentification;
  filtersToUse: ProfanityFilterType[];
}

export interface MessageIdentification {
  roomId: string;
  threadId: string;
  commentId: string;
}

export enum ProfanityFilterType {
  CHATGPT = "CHATGPT",
  PROFANITY_API = "PROFANITY_API",
}
