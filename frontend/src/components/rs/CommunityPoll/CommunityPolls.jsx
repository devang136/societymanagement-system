import Avatar from '../../components/assets/Avatar.jpg'
import React, { useState } from "react";
import CircleImg from '../../components/assets/Frame 1000005288.png';
import image1 from '../../components/assets/Frame1.png'
import image2 from '../../components/assets/frame2.png'
import { BsFillEyeFill } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import CreatePoll from './CreatePoll';

export default function PollingSystem() {
    const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
    const [pollType, setPollType] = useState("Ranking polls");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const polls = [
        {
            author: "Arlene McCoy",
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            votes: { yes: 75, no: 40 },
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            author: "Arlene McCoy",
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            votes: { yes: 75, no: 40 },
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            author: "Arlene McCoy",
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            votes: { yes: 75, no: 40 },
            timestamp: "01/07/2024, 10:00 AM",
        },
        {
            author: "Arlene McCoy",
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            votes: { yes: 75, no: 40 },
            timestamp: "01/07/2024, 10:00 AM",
        },
    ];

    return (
        <div className="flex bg-[#F0F5FB]">
            <main className="flex-1 overflow-x-hidden overflow-y-auto ">
                <div className="container mx-auto py-8">
                    <div className="flex">
                        <button
                            className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-300 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white `}>
                            Own Poll
                        </button>
                        <button
                            className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-300 bg-white text-gray-700 border-b-2 border-orange-500`}>
                            New Poll
                        </button>
                        <button
                            className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-300 bg-white text-gray-700 border-b-2 border-orange-500`}>
                            Previous Poll
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-[#202224] font-poppins">Polls</h3>
                                <button
                                    onClick={() => setIsCreatePollOpen(true)}
                                    className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors font-semibold font-poppins"
                                >
                                    Create Polls
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 pt-0">
                            {polls.map((poll, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-white p-4 shadow-md transition-shadow "
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={Avatar}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-lg text-[#6E8EF9] font-poppins">{poll.author}</h3>
                                            </div>
                                            <p className="text-sm text-[#202224] font-poppins font-normal">Multichoice polls</p>
                                        </div>
                                        <div className="flex items-center gap-1 ml-auto">

                                            <span className="bg-[#6E8EF9] text-white text-sm px-3 py-2 rounded-full flex items-center gap-1">
                                                <BsFillEyeFill className="w-5 h-5 text-white" />
                                                20
                                            </span>

                                        </div>
                                    </div>
                                    <hr className="border-[#F4F4F4] mb-4 mt-4" />

                                    <div className="mt-4">
                                        <h4 className="font-medium text-lg text-[#202224] font-poppins">{poll.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <img src={CircleImg} alt="" className="w-8 h-5" />
                                            <span className="font-poppins text-[#4F4F4F]">Select one or more</span>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            {/* Yes Section */}
                                            <div className="flex items-center gap-2">
                                                <FaRegCircle className="w-4 h-4 text-[#A7A7A7] rounded-full" />
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="flex justify-between text-sm font-medium">
                                                        <span className="text-gray-700">Yes</span>
                                                        <span className="text-gray-700 flex items-center gap-2">
                                                            <img src={image1} alt="" className="w-6 h-4" />
                                                            {poll.votes.yes}
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-200 rounded-full h-1">
                                                        <div
                                                            className="bg-[#39973D] rounded-full h-1 transition-all duration-300"
                                                            style={{ width: `${poll.votes.yes}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* No Section */}
                                            <div className="flex items-center gap-2">
                                                <FaRegCircle className="w-4 h-4 text-[#A7A7A7] rounded-full" />
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="flex justify-between text-sm font-medium">
                                                        <span className="text-gray-700">No</span>
                                                        <span className="text-gray-700 flex items-center gap-2">
                                                            <img src={image2} alt="" className="w-6 h-4" />
                                                            {poll.votes.no}
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-200 rounded-full h-1">
                                                        <div
                                                            className="bg-[#E74C3C] rounded-full h-1 transition-all duration-300"
                                                            style={{ width: `${poll.votes.no}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <p className="mt-4 text-sm text-[#A7A7A7] text-end">{poll.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CreatePoll Modal */}
                    <CreatePoll
                        isOpen={isCreatePollOpen}
                        onClose={() => setIsCreatePollOpen(false)}
                        pollType={pollType}
                        setPollType={setPollType}
                        question={question}
                        setQuestion={setQuestion}
                        options={options}
                        handleOptionChange={handleOptionChange}
                        handleAddOption={handleAddOption}
                    />
                </div>
            </main>
        </div>

    );
}
