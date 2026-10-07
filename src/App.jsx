import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SimpleLoginView } from './components/SimpleLoginView';
import { UserManagementView } from './components/UserManagementView';
import { WeeklyComplianceReportView } from './components/Reports/WeeklyComplianceReportView';
import { DashboardView } from './components/DashboardView';
import { ClientsView } from './components/ClientsView';
import { ClientProfileView } from './components/ClientProfileView';
import { LicenseMasterView } from './components/LicenseMasterView';
import { QuotationsView } from './components/QuotationsView';
import { QuotationFormView } from './components/QuotationFormView';
import { QuotationPreviewView } from './components/QuotationPreviewView';
import { ProformaInvoicesView } from './components/ProformaInvoicesView';
import { ProformaInvoiceFormView } from './components/ProformaInvoiceFormView';
import { ProformaPreviewView } from './components/ProformaPreviewView';
import { InvoicesView } from './components/InvoicesView';
import { InvoiceFormView } from './components/InvoiceFormView';
import { InvoicePreviewView } from './components/InvoicePreviewView';
import { PaymentsView } from './components/PaymentsView';
import { ServicesView } from './components/ServicesView';
import { ReportsView } from './components/ReportsView';
import { OfficeDocumentsView } from './components/OfficeDocumentsView';
import { UserCredentialsView } from './components/UserCredentialsView';
import { SettingsView } from './components/SettingsView';
import { ModulePermissionsView } from './components/ModulePermissionsView';
import EmployeePayrollView from './components/EmployeePayrollView';
import { PayrollFormView } from './components/PayrollFormView';
import { CEODashboardView } from './components/Reports/CEODashboardView';
import { DocumentCustomizationView } from './components/DocumentCustomizationView';
import { AddClientModal } from './components/Modals/AddClientModal';
import { RecordPaymentModal } from './components/Modals/RecordPaymentModal';
import { AddLicenseToClientModal } from './components/Modals/AddLicenseToClientModal';
import { UploadDocumentModal } from './components/Modals/UploadDocumentModal';
import { RequestDocumentModal } from './components/Modals/RequestDocumentModal';

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const { activeTab } = useApp();

  if (!isAuthenticated) {
    return <SimpleLoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'clients':
        return <ClientsView />;
      case 'client-profile':
        return <ClientProfileView />;
      case 'license-master':
        return <LicenseMasterView />;
      case 'quotations':
        return <QuotationsView />;
      case 'create-quotation':
        return <QuotationFormView />;
      case 'quotation-preview':
        return <QuotationPreviewView />;
      case 'proforma':
        return <ProformaInvoicesView />;
      case 'create-proforma':
        return <ProformaInvoiceFormView />;
      case 'proforma-preview':
        return <ProformaPreviewView />;
      case 'invoices':
        return <InvoicesView />;
      case 'create-invoice':
        return <InvoiceFormView />;
      case 'invoice-preview':
        return <InvoicePreviewView />;
      case 'payments':
        return <PaymentsView />;
      case 'services':
        return <ServicesView />;
      case 'weekly-report':
        return <WeeklyComplianceReportView />;
      case 'reports':
      case 'ceo-dashboard':
      case 'daily-followup':
      case 'license-status':
      case 'document-status':
      case 'renewal-report':
      case 'monthly-report':
      case 'financial-report':
      case 'custom-report':
        return <ReportsView activeReportTab={activeTab === 'reports' ? 'ceo-dashboard' : activeTab} />;
      case 'office-documents':
        return <OfficeDocumentsView />;
      case 'user-credentials':
        return <UserCredentialsView />;
      case 'user-management':
        return <UserManagementView />;
      case 'module-permissions':
        return <ModulePermissionsView />;
      case 'employees':
      case 'all-employees':
      case 'add-employee':
      case 'departments':
      case 'designations':
      case 'payroll':
      case 'payroll-dashboard':
      case 'salary-slips':
      case 'payroll-history':
        return <EmployeePayrollView />;
      case 'generate-payroll':
        return <PayrollFormView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        {renderActiveView()}
      </div>

      <AddClientModal />
      <RecordPaymentModal />
      <AddLicenseToClientModal />
      <UploadDocumentModal />
      <RequestDocumentModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </AuthProvider>
  );
}
