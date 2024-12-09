import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { pollService } from '../services/pollService';
import { X } from 'lucide-react';

interface CreatePollModalProps {
  onClose: () => void;
  onPollCreated: (poll: any) => void;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({ onClose, onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState<'Multichoice polls' | 'Rating polls' | 'Yes/No polls'>('Multichoice polls');
  const [options, setOptions] = useState<string[]>(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = async () => {
    try {
      if (!question.trim()) {
        toast.error('Please enter a question');
        return;
      }

      if (options.some(opt => !opt.trim())) {
        toast.error('Please fill all options');
        return;
      }

      const pollData = {
        question,
        pollType,
        options: options.filter(opt => opt.trim())
      };

      console.log('Creating poll:', pollData);
      const newPoll = await pollService.createPoll(pollData);

      onPollCreated(newPoll);
      onClose();
      toast.success('Poll created successfully');
    } catch (error) {
      console.error('Failed to create poll:', error);
      toast.error('Failed to create poll');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Poll</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your question"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Poll Type
            </label>
            <select
              value={pollType}
              onChange={(e) => setPollType(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="Multichoice polls">Multiple Choice</option>
              <option value="Rating polls">Rating</option>
              <option value="Yes/No polls">Yes/No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 mb-2"
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <button
              onClick={handleAddOption}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Option
            </button>
          </div>

          <button
            onClick={handleCreate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}; 