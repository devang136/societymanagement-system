'use client'

import React, { useState } from 'react'
import { UserCircle2 } from 'lucide-react'

interface PollCardProps {
  question: string
  yesVotes: number
  noVotes: number
  timestamp: string
  onVote: (option: 'Yes' | 'No') => void
}

export default function PollCard({ question, yesVotes, noVotes, timestamp, onVote }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<'Yes' | 'No' | null>(null)
  const totalVotes = yesVotes + noVotes

  const handleVote = (option: 'Yes' | 'No') => {
    if (!selectedOption) {
      setSelectedOption(option)
      onVote(option)
    }
  }

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return (votes / totalVotes) * 100
  }

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <UserCircle2 className="h-8 w-8 text-gray-400 mr-2" />
        <div>
          <h4 className="text-sm font-semibold text-blue-600">Arlene McCoy</h4>
          <p className="text-xs text-gray-500">Multichoice polls</p>
        </div>
        <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
          20
        </span>
      </div>
      <h5 className="text-sm font-medium mb-2">{question}</h5>
      <p className="text-xs text-orange-500 mb-3">Select one or more</p>
      
      <div className="space-y-3">
        <div 
          className="relative cursor-pointer"
          onClick={() => handleVote('Yes')}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <input
                type="radio"
                checked={selectedOption === 'Yes'}
                readOnly
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">{yesVotes}</span>
              <UserCircle2 className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getPercentage(yesVotes)}%` }}
            />
          </div>
        </div>

        <div 
          className="relative cursor-pointer"
          onClick={() => handleVote('No')}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <input
                type="radio"
                checked={selectedOption === 'No'}
                readOnly
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">{noVotes}</span>
              <UserCircle2 className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getPercentage(noVotes)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">{timestamp}</p>
    </div>
  )
}

