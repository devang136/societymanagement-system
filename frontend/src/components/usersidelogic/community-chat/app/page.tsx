'use client'

import React, { useState } from "react"
import { ChatSidebar } from "../components/chat-sidebar"
import { CommunityChat } from "../components/community-chat"
import { AskQuestion } from "../components/ask-question"
import type { User, Question } from "../types/chat"

const INITIAL_USERS: User[] = [
  { id: "1", name: "Michael John", avatar: "/placeholder.svg" },
  { id: "2", name: "Elizabeth Sarah", avatar: "/placeholder.svg" },
  { id: "3", name: "Jenny Wilson", avatar: "/placeholder.svg" },
  { id: "4", name: "Esther Howard", avatar: "/placeholder.svg" },
  { id: "5", name: "Cody Fisher", avatar: "/placeholder.svg" },
]

const INITIAL_QUESTIONS: Question[] = [
  {
    id: "1",
    title: "What is the capital of France?",
    content: "I'm trying to learn more about French geography and would like to know the capital city.",
    author: INITIAL_USERS[0],
    timestamp: "10:27",
    votes: 0,
    answers: []
  },
  {
    id: "2",
    title: "How do I center a div?",
    content: "I'm having trouble centering a div in CSS. Can someone help me?",
    author: INITIAL_USERS[1],
    timestamp: "9:15",
    votes: 3,
    answers: [
      {
        id: "a1",
        content: "You can use 'display: flex' and 'justify-content: center' on the parent element.",
        author: INITIAL_USERS[2],
        timestamp: "9:30",
        votes: 2
      }
    ]
  }
]

export default function Page() {
  const [users] = useState<User[]>(INITIAL_USERS)
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS)
  const [selectedId, setSelectedId] = useState<string>('community')
  const [showAskQuestion, setShowAskQuestion] = useState(false)

  const handleAskQuestion = (title: string, content: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title,
      content,
      author: { id: "current-user", name: "You", avatar: "/placeholder.svg" },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      votes: 0,
      answers: []
    }
    setQuestions(prev => [newQuestion, ...prev])
  }

  const handleVote = (id: string, isUpvote: boolean) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, votes: q.votes + (isUpvote ? 1 : -1) }
      }
      return {
        ...q,
        answers: q.answers.map(a => {
          if (a.id === id) {
            return { ...a, votes: a.votes + (isUpvote ? 1 : -1) }
          }
          return a
        })
      }
    }))
  }

  const handleAnswer = (questionId: string, content: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const newAnswer = {
          id: Date.now().toString(),
          content,
          author: { id: "current-user", name: "You", avatar: "/placeholder.svg" },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          votes: 0
        }
        return { ...q, answers: [...q.answers, newAnswer] }
      }
      return q
    }))
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar
        users={users}
        communityMessages={questions}
        onSelectUser={(userId) => setSelectedId(userId)}
        onSelectCommunity={() => setSelectedId('community')}
        selectedId={selectedId}
      />
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b flex items-center justify-between px-4">
          <h1 className="font-semibold">Communities Discussion</h1>
        </div>
        {showAskQuestion ? (
          <div className="flex-1 p-4 bg-muted/50">
            <AskQuestion onSubmit={handleAskQuestion} onClose={() => setShowAskQuestion(false)} />
          </div>
        ) : (
          <CommunityChat
            questions={questions}
            onAskQuestion={() => setShowAskQuestion(true)}
            onVote={handleVote}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  )
}

