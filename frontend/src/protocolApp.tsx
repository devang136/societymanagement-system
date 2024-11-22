import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SecurityProtocolTable from './components/SecurityProtocolTable';
import ProtocolModal from './components/ProtocolModal';
import DeleteModal from './components/DeleteModal';
import ViewModal from './components/ViewModal';

interface Protocol {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const INITIAL_PROTOCOLS: Protocol[] = [
  {
    id: '1',
    title: 'Physical Security',
    description: 'Implementing surveillance cameras in public spaces.',
    date: '2024-01-11',
    time: '15:45',
  },
  {
    id: '2',
    title: 'Cybersecurity',
    description: 'Securing critical infrastructure, government systems.',
    date: '2024-01-12',
    time: '06:40',
  },
];

export default function App() {
  const [protocols, setProtocols] = React.useState<Protocol[]>(INITIAL_PROTOCOLS);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [selectedProtocol, setSelectedProtocol] = React.useState<Protocol | null>(null);

  const handleCreateProtocol = (data: Omit<Protocol, 'id'>) => {
    const newProtocol = {
      id: String(protocols.length + 1),
      ...data,
    };
    setProtocols([...protocols, newProtocol]);
    setIsCreateModalOpen(false);
  };

  const handleEditProtocol = (data: Omit<Protocol, 'id'>) => {
    if (!selectedProtocol) return;
    
    setProtocols(protocols.map(p => 
      p.id === selectedProtocol.id 
        ? { ...p, ...data }
        : p
    ));
    setIsEditModalOpen(false);
    setSelectedProtocol(null);
  };

  const handleDeleteProtocol = () => {
    if (!selectedProtocol) return;
    
    setProtocols(protocols.filter(p => p.id !== selectedProtocol.id));
    setIsDeleteModalOpen(false);
    setSelectedProtocol(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={MOCK_USER}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Security Protocols</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Protocol
            </button>
          </div>

          <SecurityProtocolTable
            protocols={protocols}
            onEdit={(protocol) => {
              setSelectedProtocol(protocol);
              setIsEditModalOpen(true);
            }}
            onDelete={(protocol) => {
              setSelectedProtocol(protocol);
              setIsDeleteModalOpen(true);
            }}
            onView={(protocol) => {
              setSelectedProtocol(protocol);
              setIsViewModalOpen(true);
            }}
          />
        </main>
      </div>

      <ProtocolModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProtocol}
        mode="create"
      />

      <ProtocolModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProtocol(null);
        }}
        onSave={handleEditProtocol}
        initialData={selectedProtocol}
        mode="edit"
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProtocol(null);
        }}
        onConfirm={handleDeleteProtocol}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedProtocol(null);
        }}
        protocol={selectedProtocol || undefined}
      />
    </div>
  );
}