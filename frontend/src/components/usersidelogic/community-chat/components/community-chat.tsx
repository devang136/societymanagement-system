import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../../securitysidelogic/components/ui/avatar"
import { Button } from "../../../securitysidelogic/components/ui/button"
import { Card, CardContent } from "../../../securitysidelogic/components/ui/card"
import { Input } from "../../../securitysidelogic/components/ui/input"
import { MoreHorizontal } from 'lucide-react'
import type { Question, Answer } from "../types/chat"

interface CommunityChatProps {
  questions: Question[]
  onAskQuestion: () => void
  onVote: (questionId: string, isUpvote: boolean) => void
  onAnswer: (questionId: string, content: string) => void
}

export function CommunityChat({ questions, onAskQuestion, onVote, onAnswer }: CommunityChatProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Community Discussion</h2>
        <Button onClick={onAskQuestion}>Ask Question</Button>
      </div>
      {questions.map((question) => (
        <Card key={question.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={question.author.avatar} alt={question.author.name} />
                  <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{question.author.name}</div>
                  <div className="text-sm text-muted-foreground">{question.timestamp}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-xl font-semibold mt-4">{question.title}</h3>
            <p className="mt-2 text-muted-foreground">{question.content}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => onVote(question.id, true)}>▲</Button>
                <span>{question.votes} votes</span>
                <Button variant="outline" size="sm" onClick={() => onVote(question.id, false)}>▼</Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}>
                {question.answers.length} answers
              </Button>
            </div>
            {expandedQuestion === question.id && (
              <div className="mt-4 space-y-4">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="border-t pt-4">
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
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Button variant="outline" size="sm" onClick={() => onVote(answer.id, true)}>▲</Button>
                          <span>{answer.votes} votes</span>
                          <Button variant="outline" size="sm" onClick={() => onVote(answer.id, false)}>▼</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const content = (e.target as HTMLFormElement).answer.value
                  if (content.trim()) {
                    onAnswer(question.id, content)
                    ;(e.target as HTMLFormElement).reset()
                  }
                }}>
                  <Input name="answer" placeholder="Write your answer..." className="w-full" />
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

