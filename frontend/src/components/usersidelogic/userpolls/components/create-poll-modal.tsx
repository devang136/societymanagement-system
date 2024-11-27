'use client'

import React, { useState } from 'react'
import { ChevronDown, ListOrdered, CheckSquare, Star, Hash, AlignLeft } from 'lucide-react'

interface CreatePollModalProps {
  onClose: () => void
  onCreatePoll: (poll: { question: string }) => void
}

export default function CreatePollModal({ onClose, onCreatePoll }: CreatePollModalProps) {
  const [pollType, setPollType] = useState('Ranking polls')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleCreate = () => {
    if (question.trim()) {
      onCreatePoll({ question })
    }
  }

  const handleAddOption = () => {
    if (options.length < 3) {
      setOptions([...options, ''])
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Polls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="poll-type" className="block text-sm font-medium text-gray-700 mb-1">
                Polls<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="poll-type"
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none"
                  value={pollType}
                  onChange={(e) => setPollType(e.target.value)}
                >
                  <option value="Ranking polls">Ranking polls</option>
                  <option value="Multichoice polls">Multichoice polls</option>
                  <option value="Rating polls">Rating polls</option>
                  <option value="Numeric polls">Numeric polls</option>
                  <option value="Text polls">Text polls</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {pollType === 'Ranking polls' && <ListOrdered className="h-5 w-5 text-gray-400" />}
                  {pollType === 'Multichoice polls' && <CheckSquare className="h-5 w-5 text-gray-400" />}
                  {pollType === 'Rating polls' && <Star className="h-5 w-5 text-gray-400" />}
                  {pollType === 'Numeric polls' && <Hash className="h-5 w-5 text-gray-400" />}
                  {pollType === 'Text polls' && <AlignLeft className="h-5 w-5 text-gray-400" />}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Question<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="question"
                placeholder="Ask a question"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {options.map((option, index) => (
              <div key={index}>
                <label htmlFor={`option-${index + 1}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Option {index + 1}<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`option-${index + 1}`}
                  placeholder="Add"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options]
                    newOptions[index] = e.target.value
                    setOptions(newOptions)
                  }}
                />
              </div>
            ))}

            {options.length < 3 && (
              <button
                type="button"
                className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleAddOption}
              >
                Add Option
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

