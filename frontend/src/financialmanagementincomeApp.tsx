import React, { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import MaintenanceTable from '@/components/financialmanagementincomeexpense/MaintenanceTable';
import MaintenanceModal from '@/components/financialmanagementincomeexpense/MaintenanceModal';
import OtherIncomeModal from '@/components/financialmanagementincomeexpense/OtherIncomeModal';
import ViewMaintenanceModal from '@/components/financialmanagementincomeexpense/ViewMaintenanceModal';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import MaintenanceHeader from '@/components/financialmanagementincomeexpense/MaintenanceHeader';
import TabNavigation from '@/components/financialmanagementincomeexpense/TabNavigation';
import OtherIncomeSection from '@/components/financialmanagementincomeexpense/OtherIncomeSection';
import { mockMaintenance, MOCK_OTHER_INCOME, Maintenance, OtherIncome } from '@/data/mockData';

function App() {
  // State
  const [activeTab, setActiveTab] = useState('maintenance');
  const [maintenanceRecords, setMaintenanceRecords] = useState<Maintenance[]>(mockMaintenance);
  const [otherIncomeRecords, setOtherIncomeRecords] = useState<OtherIncome[]>(MOCK_OTHER_INCOME);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showOtherIncomeModal, setShowOtherIncomeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<OtherIncome | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState('Financial');

  // Handlers
  const handleAddMaintenance = (maintenance: Omit<Maintenance, 'id'>) => {
    const newMaintenance = {
      ...maintenance,
      id: maintenanceRecords.length + 1,
    };
    setMaintenanceRecords([...maintenanceRecords, newMaintenance]);
  };

  const handleAddOtherIncome = (income: Omit<OtherIncome, 'id'>) => {
    const newIncome = {
      ...income,
      id: otherIncomeRecords.length + 1,
    };
    setOtherIncomeRecords([...otherIncomeRecords, newIncome]);
  };

  const handleViewMaintenance = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowViewModal(true);
  };

  const handleDeleteMaintenance = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowDeleteModal(true);
  };

  const handleDeleteIncome = (income: OtherIncome) => {
    setSelectedIncome(income);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (activeTab === 'maintenance' && selectedMaintenance) {
      setMaintenanceRecords(maintenanceRecords.filter(m => m.id !== selectedMaintenance.id));
    } else if (activeTab === 'otherIncome' && selectedIncome) {
      setOtherIncomeRecords(otherIncomeRecords.filter(i => i.id !== selectedIncome.id));
    }
    setShowDeleteModal(false);
    setSelectedMaintenance(null);
    setSelectedIncome(null);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Financial Management" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mt-6">
            {activeTab === 'maintenance' ? (
              <>
                <MaintenanceHeader onAddClick={() => setShowMaintenanceModal(true)} />
                <MaintenanceTable
                  maintenanceData={maintenanceRecords}
                  onView={handleViewMaintenance}
                  onDelete={handleDeleteMaintenance}
                />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Other Income</h1>
                  <button
                    onClick={() => setShowOtherIncomeModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Income
                  </button>
                </div>
                <OtherIncomeSection
                  incomeData={otherIncomeRecords}
                  onDelete={handleDeleteIncome}
                />
              </>
            )}
          </div>
        </main>
      </div>

      {showMaintenanceModal && (
        <MaintenanceModal
          isOpen={showMaintenanceModal}
          onClose={() => setShowMaintenanceModal(false)}
          onSubmit={handleAddMaintenance}
        />
      )}

      {showOtherIncomeModal && (
        <OtherIncomeModal
          isOpen={showOtherIncomeModal}
          onClose={() => setShowOtherIncomeModal(false)}
          onSubmit={handleAddOtherIncome}
        />
      )}

      {showViewModal && selectedMaintenance && (
        <ViewMaintenanceModal
          isOpen={showViewModal}
          maintenance={selectedMaintenance}
          onClose={() => {
            setShowViewModal(false);
            setSelectedMaintenance(null);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Delete Confirmation"
          message={`Are you sure you want to delete this ${activeTab === 'maintenance' ? 'maintenance record' : 'income record'}?`}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMaintenance(null);
            setSelectedIncome(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;