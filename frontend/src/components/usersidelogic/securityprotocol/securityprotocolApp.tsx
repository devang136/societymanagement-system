import React from 'react';
import { Header } from './components/Header';
import { ProtocolTable } from './components/ProtocolTable';
import { protocolData } from './data/mockData';

function App() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Security Protocols</h2>
          </div>
          <div className="px-6 pb-6">
            <ProtocolTable protocols={protocolData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;