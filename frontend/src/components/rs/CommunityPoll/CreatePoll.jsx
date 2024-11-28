import React, { useState } from "react";
import Multipoll from "../../components/assets/Multichoice polls.png";
import Ranking from "../../components/assets/ranking.png";
import Rating from "../../components/assets/ranking1.png";
import Text from "../../components/assets/Group (1).png";
import Numeric from "../../components/assets/Group.png";
import { FaAngleDown } from "react-icons/fa6";

interface CreatePollProps {
  isOpen: boolean;
  onClose: () => void;
  pollType: string;
  setPollType: (type: string) => void;
  question: string;
  setQuestion: (question: string) => void;
  options: string[];
  handleOptionChange: (index: number, value: string) => void;
  handleAddOption: () => void;
}

export default function CreatePoll({
  isOpen,
  onClose,
  pollType,
  setPollType,
  question,
  setQuestion,
  options,
  handleOptionChange,
  handleAddOption,
}: CreatePollProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pollOptions = [
    { value: "Multichoice polls", label: "Multichoice polls", img: Multipoll },
    { value: "Ranking polls", label: "Ranking polls", img: Ranking },
    { value: "Rating polls", label: "Rating polls", img: Rating },
    { value: "Numeric polls", label: "Numeric polls", img: Numeric },
    { value: "Text polls", label: "Text polls", img: Text },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4 font-poppins">Create Polls</h2>
        <hr className="border-[#F4F4F4] mb-4 mt-4" />
        <div className="space-y-4">

          {/* Poll Type with Custom Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Poll Type<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 border rounded-md bg-white flex justify-between items-center text-gray-700"
              >
                <span className="flex items-center gap-2">
                  <img
                    src={pollOptions.find((option) => option.value === pollType)?.img}
                    alt=""
                    className="w-5 h-5"
                  />
                  {pollType}
                </span>
                <span className="text-gray-500"><FaAngleDown /></span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-full">
                  {pollOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setPollType(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 p-2  cursor-pointer"
                    >
                      <img src={option.img} alt="" className="w-5 h-5 " />
                      <span className="text-[#A7A7A7] hover:text-[#202224] font-poppins">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Question<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question"
              className="w-full p-2 border rounded-md border-[#D3D3D3]"
            />
          </div>

          {/* Options */}
          {options.map((option, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">
                Option {index + 1}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Add"
              />
            </div>
          ))}
          {options.length < 4 && (
            <button onClick={handleAddOption} className="text-gray-500 ">
              Add Option
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
            <button
                type="button"
                onClick={onClose}
                className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm sm:text-sm"
              >
                Cancel
              </button>
              <button
              type="button"
              className="w-1/2 inline-flex justify-center rounded-md text-gray-700 bg-[#F6F8FB] px-4 py-2 text-base font-medium shadow-sm  sm:text-sm hover:bg-gradient-to-r hover:from-[#FE512E] hover:to-[#F09619] hover:text-white"
              style={{
                transition: "background 0.3s ease",
              }}
            >
              Save
            </button>

              
            </div>

      </div>
    </div>
  );
}
