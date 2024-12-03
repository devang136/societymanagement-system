import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProtocolTable } from './components/ProtocolTable';
import { securityProtocolService } from '../../../services/securityProtocolService';
import { toast } from 'react-hot-toast';

function App() {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setLoading(true);
        const data = await securityProtocolService.getProtocols();
        setProtocols(data);
      } catch (error: any) {
        console.error('Error fetching protocols:', error);
        toast.error(error.message || 'Failed to load security protocols');
      } finally {
        setLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Security Protocols</h2>
          </div>
          <div className="px-6 pb-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : (
              <ProtocolTable protocols={protocols} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;