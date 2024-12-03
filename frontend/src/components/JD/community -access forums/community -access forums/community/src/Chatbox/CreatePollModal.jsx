import React, { useState } from "react";

const CreatePollModal = ({ onClose, onCreate }) => {
  const [pollType, setPollType] = useState("Multichoice Poll");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleCreate = () => {
    const newPoll = {
      id: Date.now(),
      author: "Current User",
      title: question,
      options: options.filter((o) => o).map((o) => ({ text: o, votes: 0 })),
      type: pollType,
      date: new Date().toLocaleString(),
    };
    onCreate(newPoll);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Poll</h3>

        {/* Poll Type */}
        <label className="block text-sm text-gray-700 mb-1">Poll Type</label>
        <select
          value={pollType}
          onChange={(e) => setPollType(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option>Multichoice Poll</option>
          <option>Ranking Poll</option>
        </select>

        {/* Question */}
        <label className="block text-sm text-gray-700 mb-1">Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Options */}
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
        ))}
        <button
          onClick={addOption}
          className="text-orange-500 text-sm mb-4 hover:underline"
        >
          + Add another option
        </button>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePollModal;
