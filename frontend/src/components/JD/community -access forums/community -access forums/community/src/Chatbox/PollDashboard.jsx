// import React, { useState } from "react";
// import PollCard from "./PollCard";
// import CreatePollModal from "./CreatePollModal";
// import { AiOutlinePlus } from "react-icons/ai";

// const PollDashboard = () => {
//   const [activeTab, setActiveTab] = useState("ownPoll");
//   const [polls, setPolls] = useState([
//     {
//       id: 1,
//       author: "Arlene McCoy",
//       title: "Sales Deal with Toyota - Azure IF + AWS Amplify?",
//       options: [
//         { text: "Yes", votes: 40 },
//         { text: "No", votes: 25 },
//       ],
//       type: "Multichoice Poll",
//       date: "01/07/2024, 10:00 AM",
//     },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCreatePoll = (newPoll) => {
//     setPolls([...polls, newPoll]);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-8 py-6">
//       {/* Tabs */}
//       <div className="flex items-center justify-between">
//         <div className="flex space-x-6">
//           {["Own Poll", "New Poll", "Previous Poll"].map((tab) => (
//             <button
//               key={tab}
//               className={`px-6 py-2 rounded-full font-medium ${
//                 activeTab === tab.toLowerCase().replace(" ", "")
//                   ? "bg-orange-500 text-white"
//                   : "bg-gray-200 text-gray-600"
//               }`}
//               onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
//         >
//           <AiOutlinePlus className="mr-2" />
//           Create Poll
//         </button>
//       </div>

//       {/* Polls Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {polls.map((poll) => (
//           <PollCard key={poll.id} poll={poll} />
//         ))}
//       </div>

//       {/* Create Poll Modal */}
//       {isModalOpen && (
//         <CreatePollModal
//           onClose={() => setIsModalOpen(false)}
//           onCreate={handleCreatePoll}
//         />
//       )}
//     </div>
//   );
// };

// export default PollDashboard;




///////////////////////////////////



import React from 'react';

const PollsPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-t-lg shadow-lg">Own Poll</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-t-lg shadow-lg">New Poll</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-t-lg shadow-lg">Previous Poll</button>
        </div>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-lg">Create Polls</button>
      </div>

      {/* Polls Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Polls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Poll Card */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">Arlene McCoy</p>
                  <p className="text-gray-500 text-sm">Multichoice polls</p>
                </div>
                <div className="ml-auto bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-xs">
                  20
                </div>
              </div>
              <h3 className="font-semibold mb-1">
                Sales Deal with Toyota - Azure HF - AMS Amplify?
              </h3>
              <p className="text-sm text-gray-500 mb-2">Select one or more</p>
              <div className="mb-2">
                <div className="flex items-center mb-1">
                  <input
                    type="radio"
                    id={`yes-${index}`}
                    name={`poll-${index}`}
                    className="mr-2"
                  />
                  <label htmlFor={`yes-${index}`} className="mr-2">
                    Yes
                  </label>
                  <div className="flex-grow h-1 bg-green-500 rounded-full ml-2" style={{ width: '75%' }}></div>
                  <span className="ml-2 text-gray-600">75</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`no-${index}`}
                    name={`poll-${index}`}
                    className="mr-2"
                  />
                  <label htmlFor={`no-${index}`} className="mr-2">
                    No
                  </label>
                  <div className="flex-grow h-1 bg-red-500 rounded-full ml-2" style={{ width: '40%' }}></div>
                  <span className="ml-2 text-gray-600">40</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">01/07/2024, 10:00 AM</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollsPage;