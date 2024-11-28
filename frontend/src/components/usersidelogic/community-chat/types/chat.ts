export interface User {
  id: string
  name: string
  avatar: string
  isAdmin?: boolean
}

export interface Message {
  id: string
  content: string
  author: User
  timestamp: string
}

export interface Question {
  id: string
  title: string
  content: string
  author: User
  timestamp: string
  votes: number
  answers: Answer[]
}

export interface Author {
  name: string;
  avatar: string;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  votes: number;
}

export interface Thread {
  author: Author;
  title: string;
  content: string;
  timestamp: string;
  votes: number;
  answers: Answer[];
}

