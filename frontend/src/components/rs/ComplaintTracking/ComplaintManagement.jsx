import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { HiMiniEye } from "react-icons/hi2";
import AddComplaintModal from "./AddComplaint";
import EditComplaintModal from "./EditComplaint";
import ViewComplaintModal from "./ViewComplaint";
import DeleteComplaintModal from "./DeleteConfirm";
import Avatar from "../../assets/Avatar.jpg"

export default function ComplaintManagement() {
    const [complaints, setComplaints] = useState([
        {
            id: "1001",
            complainantName: "Evelyn Harper",
            complaintName: "Unethical Behavior",
            description: "Providing false information or deliberately.",
            wing: "A",
            unit: "1001",
            priority: "Medium",
            status: "Pending",
            date: "Aug 5, 2024",
        },
        {
            id: "1002",
            complainantName: "Esther Howard",
            complaintName: "Preventive Measures",
            description: "Regular waste collection services.",
            wing: "B",
            unit: "1002",
            priority: "Low",
            status: "Open",
            date: "Sep 15, 2024",
        },
        {
            id: "1003",
            complainantName: "Michael Scott",
            complaintName: "Maintenance Request",
            description: "Broken elevator on the 3rd floor needs immediate repair.",
            wing: "C",
            unit: "1003",
            priority: "High",
            status: "Pending",
            date: "Nov 1, 2024",
        },
        {
            id: "1004",
            complainantName: "Angela Martin",
            complaintName: "Noise Complaint",
            description: "Loud music during late hours from neighboring unit.",
            wing: "D",
            unit: "1004",
            priority: "Medium",
            status: "solve",
            date: "Oct 25, 2024",
        },
    ]);


    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-600";
            case "Medium":
                return "bg-blue-100 text-blue-600";
            case "Low":
                return "bg-green-100 text-green-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Solve":
                return "text-green-600";
            case "Pending":
                return "text-yellow-600";
            case "Open":
                return "text-blue-600";
            default:
                return "text-gray-600";
        }
    };

    const handleAddComplaint = (newComplaint) => {
        setComplaints([
            ...complaints,
            { ...newComplaint, id: (complaints.length + 1).toString() },
        ]);
        setIsCreateModalOpen(false);
    };

    const handleEditComplaint = (updatedComplaint) => {
        setComplaints(
            complaints.map((c) =>
                c.id === updatedComplaint.id ? updatedComplaint : c
            )
        );
        setIsEditModalOpen(false);
    };

    const handleDeleteComplaint = () => {
        if (selectedComplaint) {
            setComplaints(
                complaints.filter((c) => c.id !== selectedComplaint.id)
            );
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex bg-[#F0F5FB]">
            <main className="flex-1 overflow-x-hidden overflow-y-auto ">
                <div className="container mx-auto py-8">
                    <div className="bg-white rounded-lg shadow overflow-hidden ">
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
                                    Create Complaint
                                </button>
                            </div>

                            <div className="min-w-full rounded-t-lg">
                                <div className="overflow-auto max-w-full">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-[#5678E9]/10">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                    Complainer Name
                                                </th>
                                                <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                    Complaint Name
                                                </th>
                                                <th className="px-6 py-3 text-center text-sm font-bold text-[#202224] font-poppins tracking-wider">
                                                    Description
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
                                            {complaints.map((complaint) => (
                                                <tr key={complaint.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full overflow-hidden">
                                                                <img
                                                                    src={Avatar}
                                                                    alt={complaint.complainantName}
                                                                    width={32}
                                                                    height={32}
                                                                    className="h-8 w-8 rounded-full"
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-[#4F4F4F] font-poppins">
                                                                    {complaint.complainantName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins">
                                                        {complaint.complaintName}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins">
                                                        {complaint.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-[#4F4F4F] font-poppins text-center">
                                                        <span className="flex items-center">
                                                            <span className="w-6 h-6 rounded-full bg-[#F6F8FB] text-[#5678E9] font-semibold flex items-center justify-center mr-2">
                                                                {complaint.wing}
                                                            </span>
                                                            {complaint.unit}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`w-24 h-8 inline-flex items-center justify-center text-sm leading-5 font-semibold rounded-full text-white
                          ${complaint.priority === "High"
                                                                    ? "bg-[#E74C3C] "
                                                                    : complaint.priority === "Medium"
                                                                        ? "bg-[#5678E9] "
                                                                        : "bg-[#39973D] "
                                                                }`}
                                                        >
                                                            {complaint.priority}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap ">
                                                        <span
                                                            className={`w-24 h-8 px-2 inline-flex items-center justify-center text-sm leading-5 font-semibold rounded-full 
                          ${complaint.status === "Open"
                                                                    ? "bg-blue-100 text-[#5678E9]"
                                                                    : complaint.status === "Pending"
                                                                        ? "bg-yellow-100 text-[#FFC313]"
                                                                        : "bg-green-100 text-[#39973D]"
                                                                }`}
                                                        >
                                                            {complaint.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex gap-2 justify-center">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedComplaint(complaint);
                                                                    setIsEditModalOpen(true);
                                                                }}
                                                                className="text-[#39973d]  bg-blue-50 p-1.5 rounded-md"
                                                            >
                                                                <MdEditSquare className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedComplaint(complaint);
                                                                    setIsViewModalOpen(true);
                                                                }}
                                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md"
                                                            >
                                                                <HiMiniEye className="h-5 w-5" />
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setSelectedComplaint(complaint);
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                                className="text-red-600 hover:text-red-900 bg-blue-50 p-1.5 rounded-md"
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
                </div>
            </main >
            {isCreateModalOpen && (
                <AddComplaintModal
                    onSave={handleAddComplaint}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedComplaint && (
                <EditComplaintModal
                    complaint={selectedComplaint}
                    onSave={handleEditComplaint}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            )}

            {isViewModalOpen && selectedComplaint && (
                <ViewComplaintModal
                    complaint={selectedComplaint}
                    onCancel={() => setIsViewModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteComplaintModal
                    onDelete={handleDeleteComplaint}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div >
    );
}
