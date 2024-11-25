import React, { useState } from 'react';
import { Search, Check, MoreVertical } from 'lucide-react';
import Avatar from '../assets/Avatar.jpg'
import Avatar1 from '../assets/Avatar.png'
import { AiOutlineEye } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const users = [
    { id: 1, name: "Michael John", message: "Hi, what how are you doing?", time: "10:57", isOnline: true },
    { id: 2, name: "Elizabeth Sarah", message: "Thank you for your order!", time: "8:20", },
    { id: 3, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00", isOnline: true },
    { id: 4, name: "Community", message: "Typing...", time: "8:20", },
    { id: 5, name: "Esther Howard", message: "Hello, Esther", time: "10:57", },
    { id: 6, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", },
];

const questions = [
    { id: 1, title: "What is the capital of France?", votes: 0, answers: 0 },
    { id: 2, title: "What is the capital of France?", votes: 0, answers: 1 },
    { id: 3, title: "What is the capital of France?", votes: 3, answers: 0 },
    { id: 4, title: "What is the capital of France?", votes: 0, answers: 2 },
    { id: 5, title: "What is the capital of France?", votes: 0, answers: 1 },
    { id: 6, title: "What is the capital of France?", votes: 0, answers: 0 },
];

export default function Page() {
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    return (
        <div className="flex bg-[#F0F5FB] min-h-screen overflow-x-hidden overflow-y-auto p-8">
            {/* Sidebar */}
            <div className="w-80 border-r p-4 bg-white rounded-lg shadow overflow-hidden">
                <h1 className="text-xl font-semibold text-black">Chat</h1>
                <div className="mt-2 p-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input placeholder="Search Here" className="pl-8 p-2 w-full rounded-lg bg-[#F6F8FB]" />
                    </div>
                </div>
                <div className="flex-1 overflow-auto mt-4">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="relative">
                                <img alt={user.name} className="h-10 w-10 rounded-full" src={Avatar} />
                                {user.isOnline && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.time}</p>
                                </div>
                                <div className="flex items-center justify-between gap-1">
                                    <p className="text-sm text-muted-foreground truncate ">{user.message}</p>
                                    {user.id !== 4 && <Check className="h-4 w-4 text-gray-500 text-end" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-[#F4F4F4]">
                <header className="flex items-center justify-between p-4 border-b bg-white">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full" >
                            <img src={Avatar1} alt="" />
                        </div>
                        <div>
                            <h2 className="font-semibold">Community</h2>
                            <p className="text-sm text-[#A7A7A7] ">9:00 PM</p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center justify-center'>
                    <button
                        className="text-white py-2 px-4 rounded-lg"
                        onClick={() => setShowQuestionForm(true)}
                        style={{
                            background: "linear-gradient(to right, #FE512E, #F09619)",
                            transition: "background 0.3s ease",
                        }}
                    >
                        Ask Question
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center" >
                    <BsThreeDotsVertical />
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-4">
                    {showQuestionForm ? (
                        <>
                            <div className="max-w-7xl mx-auto p-4 bg-[#F0F5FB] rounded-lg shadow  border border-[#5678E9]">
                                <h2 className="text-lg font-semibold mb-4 text-[#4F4F4F]">Writing a good question</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-sm">
                                            You're ready to <span className="text-blue-600">ask a programming-related question</span> and this form will help guide you through the process.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Looking to ask a non-programming question? See <span className="text-blue-600">the topics here</span> to find a relevant site.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold">Steps</h3>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Summarize your problem in a one-line title.</li>
                                            <li>• Describe your problem in more detail.</li>
                                            <li>• Describe what you tried and what you expected to happen.</li>
                                            <li>• Add "tags" which help surface your question to members of the community.</li>
                                            <li>• Review your question and post it to the site.</li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                            <div className="max-w-7xl mx-auto p-4 bg-[#F4F4F4] rounded-lg border border-gray-200  mt-3">
                                <div className="space-y-2">
                                    <h3 className="font-semibold">Title</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Be specific and imagine you're asking a question to another person.
                                    </p>
                                    <input
                                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                                        className="border p-2 w-full rounded border-[#5678E9]"
                                    />
                                </div>

                                <button className=" text-white py-2 px-4 rounded mt-5"
                                 style={{
                                    background: "linear-gradient(to right, #FE512E, #F09619)",
                                    transition: "background 0.3s ease",
                                }}>
                                    Next
                                </button>
                            </div>
                        </>) : (
                        <div className="space-y-4">
                        {questions.map((question) => (
                          <div key={question.id} className="bg-[#F0F5FB] p-4 rounded-lg shadow">
                          {/* Title and Votes/Answers */}
                          <div className="flex items-center justify-between">
                            {/* Votes and Answers */}
                            <div className="flex flex-col pr-8">
                                <span>{question.votes} votes</span>
                                <span>{question.answers} answers</span>
                            </div>
                            <div >
                            <h3 className="font-medium">{question.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">
                              Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your...
                            </p>
                            </div>
                            {/* Views with Icon */}
                            <div className="flex items-center gap-1 bg-white rounded-xl px-2">
                              <AiOutlineEye className="h-4 w-4 text-gray-500" />
                              <span>20 </span>
                            </div>
                          </div>
                        </div>
                        
                        ))}
                      </div>
                      
                    )}
                </div>
            </div>
        </div>
    );
}
