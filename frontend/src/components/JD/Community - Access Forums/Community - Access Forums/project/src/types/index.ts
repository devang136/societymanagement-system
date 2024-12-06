export interface User {
  id: number;
  name: string;
  avatar: string;
  status: string;
  lastSeen?: string;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  image?: string;
  file?: {
    name: string;
    url: string;
    type: string;
    size: number;
  };
}

export interface Contact extends User {
  lastMessage?: string;
  time: string;
}

export interface CallState {
  isIncoming: boolean;
  isOutgoing: boolean;
  isActive: boolean;
  isVideo: boolean;
  peerId?: string;
  contactId?: number;
}