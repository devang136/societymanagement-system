'use client'

import React, { useState } from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import CreatePollModal from './components/create-poll-modal'
import PollCard from './components/poll-card'

interface Poll {
  id: number
  question: string
  yesVotes: number
  noVotes: number
  timestamp: string
}

export default function PollingDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('own')
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: 'Sales Deal with Toyota - Azure HF - AMS Amplify ?',
      yesVotes: 75,
      noVotes: 40,
      timestamp: '01/07/2024, 10:00 AM'
    }
  ])

  const handleCreatePoll = (newPoll: { question: string }) => {
    const poll: Poll = {
      id: Date.now(),
      question: newPoll.question,
      yesVotes: 0,
      noVotes: 0,
      timestamp: new Date().toLocaleString()
    }
    setPolls([poll, ...polls])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Home</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-blue-600">Polls</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Moni Roy</span>
                <span className="text-xs text-gray-500 ml-1">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('own')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'own'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Own Poll
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'new'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  New Poll
                </button>
                <button
                  onClick={() => setActiveTab('previous')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'previous'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Previous Poll
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Create Polls
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-4">Polls</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {polls.map((poll) => (
                <PollCard
                  key={poll.id}
                  question={poll.question}
                  yesVotes={poll.yesVotes}
                  noVotes={poll.noVotes}
                  timestamp={poll.timestamp}
                  onVote={(option) => {
                    const updatedPolls = polls.map((p) => {
                      if (p.id === poll.id) {
                        return {
                          ...p,
                          yesVotes: option === 'Yes' ? p.yesVotes + 1 : p.yesVotes,
                          noVotes: option === 'No' ? p.noVotes + 1 : p.noVotes,
                        }
                      }
                      return p
                    })
                    setPolls(updatedPolls)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CreatePollModal onClose={() => setIsModalOpen(false)} onCreatePoll={handleCreatePoll} />
      )}
    </div>
  )
}

