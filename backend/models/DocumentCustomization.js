import mongoose from 'mongoose';

const documentCustomizationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documentType: {
    type: String,
    enum: ['Quotation', 'ProformaInvoice', 'Invoice'],
    required: true
  },
  isDefault: Boolean,
  customizationName: String,

  headerConfig: {
    showLogo: { type: Boolean, default: true },
    companyName: String,
    showCompanyDetails: { type: Boolean, default: true },
    logoUrl: String,
    headerColor: { type: String, default: '#0f172a' },
    headerBackgroundColor: { type: String, default: '#ffffff' }
  },

  columns: [{
    id: String,
    label: String,
    key: String,
    visible: { type: Boolean, default: true },
    width: String,
    order: Number,
    format: String
  }],

  itemsTableConfig: {
    showItemNumber: { type: Boolean, default: true },
    showDescription: { type: Boolean, default: true },
    showQuantity: { type: Boolean, default: true },
    showRate: { type: Boolean, default: true },
    showAmount: { type: Boolean, default: true },
    showTax: { type: Boolean, default: true },
    totalColumnsVisible: { type: Boolean, default: true }
  },

  totalsConfig: {
    showSubtotal: { type: Boolean, default: true },
    showCGST: { type: Boolean, default: true },
    showSGST: { type: Boolean, default: true },
    showOtherCharges: { type: Boolean, default: true },
    showGrandTotal: { type: Boolean, default: true },
    currencySymbol: { type: String, default: '₹' },
    decimalPlaces: { type: Number, default: 2 }
  },

  footerConfig: {
    showTermsAndConditions: { type: Boolean, default: true },
    termsText: String,
    showSignature: { type: Boolean, default: true },
    signatureLabel: String,
    showBankDetails: { type: Boolean, default: false },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String
    },
    showNotes: { type: Boolean, default: true },
    notesText: String
  },

  fieldLabels: {
    quotationTitle: { type: String, default: 'Quotation' },
    invoiceTitle: { type: String, default: 'Invoice' },
    proformaTitle: { type: String, default: 'Proforma Invoice' },
    quoteNo: { type: String, default: 'Quote No' },
    invoiceNo: { type: String, default: 'Invoice No' },
    date: { type: String, default: 'Date' },
    dueDate: { type: String, default: 'Due Date' },
    billTo: { type: String, default: 'Bill To' },
    shipTo: { type: String, default: 'Ship To' },
    description: { type: String, default: 'Description' },
    quantity: { type: String, default: 'Qty' },
    rate: { type: String, default: 'Rate' },
    amount: { type: String, default: 'Amount' },
    subtotal: { type: String, default: 'Subtotal' },
    total: { type: String, default: 'Total' }
  },

  colorScheme: {
    primary: { type: String, default: '#2563eb' },
    secondary: { type: String, default: '#10b981' },
    accent: { type: String, default: '#f59e0b' },
    danger: { type: String, default: '#ef4444' },
    textPrimary: { type: String, default: '#0f172a' },
    textSecondary: { type: String, default: '#64748b' },
    borderColor: { type: String, default: '#e2e8f0' },
    backgroundColor: { type: String, default: '#ffffff' }
  },

  pageConfig: {
    pageSize: { type: String, default: 'A4' },
    orientation: { type: String, enum: ['Portrait', 'Landscape'], default: 'Portrait' },
    marginTop: { type: String, default: '20mm' },
    marginRight: { type: String, default: '20mm' },
    marginBottom: { type: String, default: '20mm' },
    marginLeft: { type: String, default: '20mm' }
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('DocumentCustomization', documentCustomizationSchema);
