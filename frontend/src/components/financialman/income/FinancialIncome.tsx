

import React, { useState } from 'react';
import { Header } from './Header';
import { TabNavigation } from './TabNavigation';
import { MaintenanceTable } from './MaintenanceTable';
import { MaintenanceModal } from './MaintenanceModal';
import { OtherIncomeModal } from './OtherIncomeModal';
import { ViewMaintenanceModal } from './ViewMaintenanceModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { MaintenanceHeader } from './MaintenanceHeader';
import { OtherIncomeSection } from './OtherIncomeSection';
import { MOCK_RESIDENTS, MOCK_OTHER_INCOME } from './incomedata/mockData';

export function FinancialIncome() {
  // State management
  const [activeTab, setActiveTab] = useState<'maintenance' | 'other-income'>('maintenance');
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isOtherIncomeModalOpen, setIsOtherIncomeModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState<string | null>(null);
  const [maintenanceAmount, setMaintenanceAmount] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);
  const [otherIncomes, setOtherIncomes] = useState(MOCK_OTHER_INCOME);
  const [selectedMaintenanceDetails, setSelectedMaintenanceDetails] = useState<any>(null);
  const [residents, setResidents] = useState(MOCK_RESIDENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handlers
  const handleSetMaintenance = () => {
    setIsMaintenanceModalOpen(true);
  };

  const handleMaintenanceSubmit = (data: { maintenanceAmount: number; penaltyAmount: number; dueDate: string }) => {
    setMaintenanceAmount(data.maintenanceAmount);
    setPenaltyAmount(data.penaltyAmount);
    setIsMaintenanceModalOpen(false);
  };

  const handleCreateOtherIncome = () => {
    setSelectedIncomeId(null);
    setIsOtherIncomeModalOpen(true);
  };

  const handleEditOtherIncome = (id: string) => {
    setSelectedIncomeId(id);
    setIsOtherIncomeModalOpen(true);
  };

  const handleViewMaintenance = (id: string) => {
    const resident = residents.find(r => r.id === id);
    if (resident) {
      setSelectedMaintenanceDetails({
        name: resident.name,
        date: resident.date,
        wing: resident.unitNumber.charAt(0),
        unit: resident.unitNumber,
        status: resident.status,
        amount: resident.amount,
        penalty: resident.penalty,
        paymentStatus: resident.paymentStatus,
        paymentType: resident.paymentType
      });
      setIsViewModalOpen(true);
    }
  };

  const handleDeleteOtherIncome = (id: string) => {
    setSelectedIncomeId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedIncomeId) {
      setOtherIncomes(otherIncomes.filter(income => income.id !== selectedIncomeId));
      setIsDeleteModalOpen(false);
      setSelectedIncomeId(null);
    }
  };

  const handleOtherIncomeSubmit = (data: {
    title: string;
    amount: number;
    date: string;
    dueDate: string;
    description: string;
  }) => {
    if (selectedIncomeId) {
      setOtherIncomes(otherIncomes.map(income => 
        income.id === selectedIncomeId
          ? {
              ...income,
              title: data.title,
              amountPerMember: data.amount,
              date: data.date,
              dueDate: data.dueDate,
              description: data.description
            }
          : income
      ));
    } else {
      setOtherIncomes([
        ...otherIncomes,
        {
          id: (otherIncomes.length + 1).toString(),
          title: data.title,
          amountPerMember: data.amount,
          totalMember: 12,
          date: data.date,
          dueDate: data.dueDate,
          description: data.description
        }
      ]);
    }
    setIsOtherIncomeModalOpen(false);
    setSelectedIncomeId(null);
  };

  // Computed values
  const selectedIncome = selectedIncomeId
    ? otherIncomes.find(income => income.id === selectedIncomeId)
    : null;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = residents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(residents.length / itemsPerPage);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {activeTab === 'maintenance' && (
            <MaintenanceHeader
              maintenanceAmount={maintenanceAmount}
              penaltyAmount={penaltyAmount}
              onSetMaintenance={handleSetMaintenance}
            />
          )}

          <div className="bg-white shadow rounded-lg">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            {activeTab === 'maintenance' ? (
              <>
                <MaintenanceTable
                  residents={currentItems}
                  onViewMaintenance={handleViewMaintenance}
                  onSetMaintenance={handleSetMaintenance}
                />
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(indexOfLastItem, residents.length)}</span> of{' '}
                        <span className="font-medium">{residents.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <OtherIncomeSection
                otherIncomes={otherIncomes}
                onCreateIncome={handleCreateOtherIncome}
                onEdit={handleEditOtherIncome}
                onView={handleViewMaintenance}
                onDelete={handleDeleteOtherIncome}
              />
            )}
          </div>
        </div>
      </main>

      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSubmit={handleMaintenanceSubmit}
      />

      <OtherIncomeModal
        isOpen={isOtherIncomeModalOpen}
        onClose={() => {
          setIsOtherIncomeModalOpen(false);
          setSelectedIncomeId(null);
        }}
        onSubmit={handleOtherIncomeSubmit}
        initialData={selectedIncome ? {
          title: selectedIncome.title,
          amount: selectedIncome.amountPerMember,
          date: selectedIncome.date,
          dueDate: selectedIncome.dueDate,
          description: selectedIncome.description
        } : undefined}
        mode={selectedIncomeId ? 'edit' : 'create'}
      />

      {selectedMaintenanceDetails && (
        <ViewMaintenanceModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedMaintenanceDetails(null);
          }}
          details={selectedMaintenanceDetails}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedIncomeId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Other Income"
        message="Are you sure you want to delete this income entry?"
      />
    </div>
  );
}