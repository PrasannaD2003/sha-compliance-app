import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import DocumentCustomization from '../models/DocumentCustomization.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sha-compliance');
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await DocumentCustomization.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create default users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'ceo@shacompliance.com',
        password: 'password123',
        role: 'CEO',
        department: 'Management',
        avatar: 'A',
        permissions: {
          canViewReports: true,
          canEditDocuments: true,
          canApprove: true,
          canManageUsers: true,
          canExport: true,
          canCustomize: true
        }
      },
      {
        name: 'Rajesh Kumar',
        email: 'manager@shacompliance.com',
        password: 'password123',
        role: 'Manager',
        department: 'Compliance',
        avatar: 'R',
        permissions: {
          canViewReports: true,
          canEditDocuments: true,
          canApprove: true,
          canManageUsers: false,
          canExport: true,
          canCustomize: true
        }
      },
      {
        name: 'Priya Sharma',
        email: 'staff@shacompliance.com',
        password: 'password123',
        role: 'Staff',
        department: 'Operations',
        avatar: 'P',
        permissions: {
          canViewReports: true,
          canEditDocuments: true,
          canApprove: false,
          canManageUsers: false,
          canExport: true,
          canCustomize: false
        }
      }
    ]);

    console.log('✅ Created 3 default users');
    console.log('   - ceo@shacompliance.com (CEO)');
    console.log('   - manager@shacompliance.com (Manager)');
    console.log('   - staff@shacompliance.com (Staff)');
    console.log('   Password for all: password123');

    // Create default customizations for each document type
    const documentTypes = ['Quotation', 'ProformaInvoice', 'Invoice'];
    const customizations = [];

    for (const userId of users.map(u => u._id)) {
      for (const docType of documentTypes) {
        customizations.push({
          userId,
          documentType: docType,
          customizationName: 'Default',
          isDefault: true,
          headerConfig: {
            showLogo: true,
            companyName: 'SHA Compliance & Services PVT LTD',
            showCompanyDetails: true,
            headerColor: '#0f172a',
            headerBackgroundColor: '#ffffff'
          },
          columns: [
            { id: 'itemNo', label: 'Item No', visible: true, order: 1 },
            { id: 'description', label: 'Description', visible: true, order: 2 },
            { id: 'quantity', label: 'Qty', visible: true, order: 3 },
            { id: 'rate', label: 'Rate', visible: true, order: 4 },
            { id: 'amount', label: 'Amount', visible: true, order: 5 },
            { id: 'tax', label: 'Tax', visible: true, order: 6 }
          ],
          itemsTableConfig: {
            showItemNumber: true,
            showDescription: true,
            showQuantity: true,
            showRate: true,
            showAmount: true,
            showTax: true,
            totalColumnsVisible: true
          },
          totalsConfig: {
            showSubtotal: true,
            showCGST: true,
            showSGST: true,
            showOtherCharges: true,
            showGrandTotal: true,
            currencySymbol: '₹',
            decimalPlaces: 2
          },
          footerConfig: {
            showTermsAndConditions: true,
            termsText: '1. Payment terms: Net 30 days\n2. This is a confidential document\n3. Prices are valid for 30 days',
            showSignature: true,
            signatureLabel: 'Authorized Signatory',
            showBankDetails: false,
            showNotes: true,
            notesText: 'Thank you for your business'
          },
          fieldLabels: {
            quotationTitle: 'Quotation',
            invoiceTitle: 'Invoice',
            proformaTitle: 'Proforma Invoice',
            quoteNo: 'Quote No',
            invoiceNo: 'Invoice No',
            date: 'Date',
            dueDate: 'Due Date',
            billTo: 'Bill To',
            shipTo: 'Ship To',
            description: 'Description',
            quantity: 'Qty',
            rate: 'Rate',
            amount: 'Amount',
            subtotal: 'Subtotal',
            total: 'Total'
          },
          colorScheme: {
            primary: '#2563eb',
            secondary: '#10b981',
            accent: '#f59e0b',
            danger: '#ef4444',
            textPrimary: '#0f172a',
            textSecondary: '#64748b',
            borderColor: '#e2e8f0',
            backgroundColor: '#ffffff'
          },
          pageConfig: {
            pageSize: 'A4',
            orientation: 'Portrait',
            marginTop: '20mm',
            marginRight: '20mm',
            marginBottom: '20mm',
            marginLeft: '20mm'
          }
        });
      }
    }

    await DocumentCustomization.insertMany(customizations);
    console.log(`✅ Created ${customizations.length} default customizations`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\nYou can now login with:');
    console.log('  Email: ceo@shacompliance.com');
    console.log('  Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
