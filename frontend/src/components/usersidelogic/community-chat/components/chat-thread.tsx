import { Avatar, AvatarImage, AvatarFallback } from "../../../securitysidelogic/components/ui/avatar"
import { Button } from "../../../securitysidelogic/components/ui/button"
import { Card, CardContent, CardHeader } from "../../../securitysidelogic/components/ui/card"
import { Input } from "../../../securitysidelogic/components/ui/input"
import { MoreVertical } from 'lucide-react'
import type { Thread } from "../types/chat"
import React from "react"
React
interface ChatThreadProps {
  thread: Thread
  onReply: (content: string) => void
}

export function ChatThread({ thread, onReply }: ChatThreadProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const content = new FormData(form).get("content") as string
    if (content.trim()) {
      onReply(content)
      form.reset()
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{thread.author.name}</div>
                <div className="text-sm text-muted-foreground">{thread.timestamp}</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold mt-4">{thread.title}</h2>
          <p className="mt-2 text-muted-foreground">{thread.content}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{thread.votes} votes</span>
            <span>{thread.answers.length} answers</span>
          </div>
        </CardContent>
      </Card>

      {thread.answers.map((answer, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{answer.author.name}</span>
                  <span className="text-sm text-muted-foreground">{answer.timestamp}</span>
                </div>
                <p className="mt-2">{answer.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <Input name="content" placeholder="Write your reply..." className="w-full" />
      </form>
    </div>
  )
}

