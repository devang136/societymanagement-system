import { Avatar, AvatarFallback, AvatarImage } from "../../../securitysidelogic/components/ui/avatar"
import { Input } from "../../../securitysidelogic/components/ui/input"
import { Search } from 'lucide-react'
import type { Message, Question, User } from "../types/chat"
import React from "react"

interface ChatSidebarProps {
  users: User[]
  communityMessages: Question[]
  onSelectUser: (userId: string) => void
  onSelectCommunity: () => void
  selectedId?: string
}

export function ChatSidebar({ users, communityMessages, onSelectUser, onSelectCommunity, selectedId }: ChatSidebarProps) {
  return (
    <div className="w-80 border-r h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-2">Chat</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Here" className="pl-8" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <button
          onClick={onSelectCommunity}
          className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors ${
            selectedId === 'community' ? "bg-muted" : ""
          }`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt="Community" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="font-medium">Community</span>
              <span className="text-xs text-muted-foreground">9:00 Pm</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {communityMessages[0]?.content || "No messages yet"}
            </p>
          </div>
        </button>
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors ${
              selectedId === user.id ? "bg-muted" : ""
            }`}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">10:27</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {"Last message placeholder"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

