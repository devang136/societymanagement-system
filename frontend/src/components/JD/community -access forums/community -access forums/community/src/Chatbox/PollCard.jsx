import React from "react";
import { FaUserCircle } from "react-icons/fa";

const PollCard = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaUserCircle className="text-gray-500 text-3xl mr-2" />
          <div>
            <h4 className="font-medium text-gray-700">{poll.author}</h4>
            <p className="text-sm text-gray-500">{poll.type}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{poll.date}</p>
      </div>

      {/* Poll Title */}
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{poll.title}</h3>

      {/* Options */}
      <div className="mt-4">
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center mt-2">
            <span className="w-24 text-gray-600">{option.text}</span>
            <div className="flex-grow bg-gray-200 rounded-full h-2 mx-2 relative">
              <div
                className="absolute top-0 left-0 h-2 bg-orange-500 rounded-full"
                style={{ width: `${(option.votes / totalVotes) * 100}%` }}
              />
            </div>
            <span className="text-gray-600 text-sm">
              {option.votes} ({((option.votes / totalVotes) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollCard;
