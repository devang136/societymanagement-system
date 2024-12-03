import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { HiMiniEye } from "react-icons/hi2";
import AddRequestModal from "./AddRequest";
import EditRequestModal from "./EditRequest";
import ViewRequestModal from "./ViewRequest";
import DeleteRequestModal from "./DeleteConfirm";
import Avatar from "../../assets/Avatar.jpg";

export default function RequestManagement() {
    const [Requests, setRequests] = useState([
        {
            id: "1001",
            RequesterName: "Evelyn Harper",
            RequestName: "Unethical Behavior",
            description: "Event and recreational activities.",
            wing: "A",
            unit: "1001",
            priority: "Medium",
            status: "Pending",
            date: "10/02/2024",
        },
        {
            id: "1002",
            RequesterName: "Esther Howard",
            RequestName: "Preventive Measures",
            description: "Regular waste collection services.",
            wing: "B",
            unit: "1002",
            priority: "Low",
            status: "Open",
            date: "11/02/2024",
        },
        {
            id: "1003",
            RequesterName: "Michael Scott",
            RequestName: "Maintenance Request",
            description: "Event and recreational activities.",
            wing: "C",
            unit: "1003",
            priority: "High",
            status: "Pending",
            date: "12/02/2024",
        },
        {
            id: "1004",
            RequesterName: "Angela Martin",
            RequestName: "Noise Request",
            description: "Regular waste collection services.",
            wing: "D",
            unit: "1004",
            priority: "Medium",
            status: "Solve",
            date: "13/02/2024",
        },
    ]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        setRequests(
            [...Requests].sort((a, b) => {
                if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
                if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
                return 0;
            })
        );
    };

    const handleAddRequest = (newRequest) => {
        setRequests([
            ...Requests,
            { ...newRequest, id: (Requests.length + 1).toString() },
        ]);
        setIsCreateModalOpen(false);
    };

    const handleEditRequest = (updatedRequest) => {
        setRequests(
            Requests.map((c) =>
                c.id === updatedRequest.id ? updatedRequest : c
            )
        );
        setIsEditModalOpen(false);
    };

    const handleDeleteRequest = () => {
        if (selectedRequest) {
            setRequests(
                Requests.filter((c) => c.id !== selectedRequest.id)
            );
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex bg-[#F0F5FB]">
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="container mx-auto py-8 ">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-5">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-xl font-semibold text-gray-900 font-poppins">
                                    Create Complaint
                                </h1>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="px-4 py-2 text-white rounded-md font-poppins font-semibold"
                                    style={{
                                        background: "linear-gradient(to right, #FE512E, #F09619)",
                                        transition: "background 0.3s ease",
                                    }}
                                >
                                    Create Request
                                </button>
                            </div>

                            <div className="rounded-t-lg">
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-[#5678E9]/10">
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-sm font-bold text-[#202224] font-poppins tracking-wider cursor-pointer"
                                                onClick={() => handleSort("RequesterName")}
                                            >
                                                Requester Name
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-sm font-bold text-[#202224] font-poppins tracking-wider cursor-pointer"
                                                onClick={() => handleSort("RequestName")}
                                            >
                                                Request Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Request Date
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Unit Number
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Requests.map((Request) => (
                                            <tr key={Request.id}>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full overflow-hidden">
                                                            <img
                                                                src={Avatar}
                                                                alt={Request.RequesterName}
                                                                className="h-8 w-8 rounded-full"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-base font-medium text-[#4F4F4F] font-poppins">
                                                                {Request.RequesterName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins">
                                                    {Request.RequestName}
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins">
                                                    {Request.description}
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins text-center">
                                                    {Request.date}
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins text-center">
                                                    {Request.unit}
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`w-24 h-8 inline-flex items-center justify-center text-sm leading-5 font-semibold rounded-full text-white
                          ${Request.priority === "High"
                                                                    ? "bg-[#E74C3C]"
                                                                    : Request.priority === "Medium"
                                                                        ? "bg-[#5678E9]"
                                                                        : "bg-[#39973D]"
                                                                }`}
                                                    >
                                                        {Request.priority}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`w-24 h-8 px-2 inline-flex items-center justify-center text-sm leading-5 font-semibold rounded-full 
                          ${Request.status === "Open"
                                                                    ? "bg-blue-100 text-[#5678E9]"
                                                                    : Request.status === "Pending"
                                                                        ? "bg-yellow-100 text-[#FFC313]"
                                                                        : "bg-green-100 text-[#39973D]"
                                                                }`}
                                                    >
                                                        {Request.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedRequest(Request);
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="text-[#39973d] bg-blue-50 p-1.5 rounded-md"
                                                        >
                                                            <MdEditSquare className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedRequest(Request);
                                                                setIsViewModalOpen(true);
                                                            }}
                                                            className="text-blue-600  bg-blue-50 p-1.5 rounded-md"
                                                        >
                                                            <HiMiniEye className="h-5 w-5" />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedRequest(Request);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                            className="text-red-600  bg-blue-50 p-1.5 rounded-md"
                                                        >
                                                            <RiDeleteBin5Fill className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {isCreateModalOpen && (
                <AddRequestModal
                    onSave={handleAddRequest}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedRequest && (
                <EditRequestModal
                    Request={selectedRequest}
                    onSave={handleEditRequest}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            )}

            {isViewModalOpen && selectedRequest && (
                <ViewRequestModal
                    Request={selectedRequest}
                    onCancel={() => setIsViewModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteRequestModal
                    onDelete={handleDeleteRequest}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    );
}
