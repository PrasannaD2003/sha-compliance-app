export const initialCompanySettings = {
  name: "SHA COMPLIANCE & SERVICES PVT LTD",
  subtitle: "Software & Healthcare License Consultancy",
  address: "Chennai, Tamil Nadu - 600001",
  phone: "+91 98765 43210",
  email: "info@shacompliance.com",
  website: "www.shacompliance.com",
  gstin: "33AABCS1234F1Z9",
  bankName: "HDFC Bank Ltd",
  accountNo: "50200088991122",
  ifsc: "HDFC0001234",
  branch: "Anna Salai, Chennai",
  upiId: "shacompliance@hdfcbank",
  terms: [
    "Government fees are subject to applicable authority charges.",
    "Consultancy charges are as agreed in the quotation.",
    "Processing time depends on the concerned authority.",
    "Required documents must be provided by the client."
  ]
};

export const initialServices = [
  {
    id: "SRV-001",
    name: "Fire NOC Consultancy",
    description: "Fire safety documentation and application support",
    govtFee: 15000,
    consultancyFee: 20000,
    gstRate: 18
  },
  {
    id: "SRV-002",
    name: "Clinical Establishment Act (CEA)",
    description: "CEA registration documentation and application support",
    govtFee: 10000,
    consultancyFee: 25000,
    gstRate: 18
  },
  {
    id: "SRV-003",
    name: "Biomedical Waste Authorization",
    description: "Documentation and compliance support",
    govtFee: 5000,
    consultancyFee: 10000,
    gstRate: 18
  },
  {
    id: "SRV-004",
    name: "AERB Registration & Shielding",
    description: "Atomic energy regulatory board license & radiation safety",
    govtFee: 25000,
    consultancyFee: 35000,
    gstRate: 18
  },
  {
    id: "SRV-005",
    name: "Pharmacy License Consultancy",
    description: "Form 20 & 21 retail & wholesale drug licensing support",
    govtFee: 12000,
    consultancyFee: 18000,
    gstRate: 18
  },
  {
    id: "SRV-006",
    name: "Pollution Control Board (PCB) NOC",
    description: "Consent to Establish (CTE) & Consent to Operate (CTO)",
    govtFee: 20000,
    consultancyFee: 30000,
    gstRate: 18
  }
];

export const initialClients = [
  {
    id: "CL-0001",
    name: "ABC Multispeciality Hospital",
    contactPerson: "Mr. Ramesh",
    phone: "9876543210",
    email: "admin@abchospital.com",
    gstin: "33ABCDE1234F1Z5",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "123 Mount Road, Chennai, Tamil Nadu - 600001",
    outstanding: 44400
  },
  {
    id: "CL-0002",
    name: "Sri Lakshmi Dental Clinic",
    contactPerson: "Dr. Priya",
    phone: "9676508676",
    email: "priya@dentalclinic.com",
    gstin: "33FGHIJ5678G1Z2",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "45 Luz Church Road, Mylapore, Chennai - 600004",
    outstanding: 0
  },
  {
    id: "CL-0003",
    name: "Medicare Hospital",
    contactPerson: "Mr. Karthik",
    phone: "9645012345",
    email: "info@medicarehosp.com",
    gstin: "33EFG5678H1Z3",
    city: "Coimbatore",
    state: "Tamil Nadu",
    address: "88 DB Road, RS Puram, Coimbatore - 641002",
    outstanding: 125000
  },
  {
    id: "CL-0004",
    name: "City Care Hospital",
    contactPerson: "Dr. Anitha",
    phone: "9640012345",
    email: "anitha@citycare.com",
    gstin: "33HIK6789L1Z4",
    city: "Madurai",
    state: "Tamil Nadu",
    address: "12 KK Nagar Main Road, Madurai - 625020",
    outstanding: 35400
  },
  {
    id: "CL-0005",
    name: "Life Line Clinic",
    contactPerson: "Dr. Murali",
    phone: "9840088765",
    email: "murali@lifeline.com",
    gstin: "33LMN6789P1Z5",
    city: "Salem",
    state: "Tamil Nadu",
    address: "55 Fairlands Main Rd, Salem - 636016",
    outstanding: 0
  }
];

export const initialQuotations = [
  {
    id: "QTN-2026-0004",
    quotationNo: "QTN-2026-0004",
    clientId: "CL-0001",
    clientName: "ABC Multispeciality Hospital",
    contactPerson: "Mr. Ramesh",
    phone: "9876543210",
    email: "admin@abchospital.com",
    gstin: "33ABCDE1234F1Z5",
    address: "123 Mount Road, Chennai, Tamil Nadu - 600001",
    date: "2026-09-29",
    validUntil: "2026-10-29",
    status: "Draft",
    items: [
      {
        id: 1,
        serviceName: "Fire NOC Consultancy",
        description: "Fire safety documentation and application support",
        qty: 1,
        govtFee: 15000,
        consultancyFee: 20000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 2,
        serviceName: "Clinical Establishment Act (CEA)",
        description: "CEA registration documentation and application support",
        qty: 1,
        govtFee: 10000,
        consultancyFee: 25000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 3,
        serviceName: "Biomedical Waste Authorization",
        description: "Documentation and compliance support",
        qty: 1,
        govtFee: 5000,
        consultancyFee: 10000,
        gstRate: 18,
        total: 17700
      }
    ],
    govtSubtotal: 30000,
    consultancySubtotal: 55000,
    subtotal: 85000,
    discount: 5000,
    taxableAmount: 80000,
    cgst: 7200,
    sgst: 7200,
    grandTotal: 94400,
    amountInWords: "Rupees Ninety-Four Thousand Four Hundred Only",
    paymentTerms: "50% Advance / 50% Completion"
  },
  {
    id: "QTN-2026-0001",
    quotationNo: "QTN-2026-0001",
    clientId: "CL-0001",
    clientName: "ABC Multispeciality Hospital",
    date: "2026-09-28",
    validUntil: "2026-10-28",
    grandTotal: 58000,
    status: "Sent"
  },
  {
    id: "QTN-2026-0002",
    quotationNo: "QTN-2026-0002",
    clientId: "CL-0002",
    clientName: "Sri Lakshmi Dental Clinic",
    date: "2026-09-25",
    validUntil: "2026-10-25",
    grandTotal: 35400,
    status: "Accepted"
  },
  {
    id: "QTN-2026-0003",
    quotationNo: "QTN-2026-0003",
    clientId: "CL-0003",
    clientName: "Medicare Hospital",
    date: "2026-09-20",
    validUntil: "2026-10-20",
    grandTotal: 82600,
    status: "Draft"
  }
];

export const initialProformaInvoices = [
  {
    id: "PI-2026-0001",
    proformaNo: "PI-2026-0001",
    quotationNo: "QTN-2026-0004",
    clientId: "CL-0001",
    clientName: "ABC Multispeciality Hospital",
    contactPerson: "Mr. Ramesh",
    phone: "9876543210",
    email: "admin@abchospital.com",
    gstin: "33ABCDE1234F1Z5",
    address: "123 Mount Road, Chennai, Tamil Nadu - 600001",
    date: "2026-09-29",
    validUntil: "2026-10-29",
    status: "Issued",
    items: [
      {
        id: 1,
        serviceName: "Fire NOC Consultancy",
        description: "Fire safety documentation and application support",
        qty: 1,
        govtFee: 15000,
        consultancyFee: 20000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 2,
        serviceName: "Clinical Establishment Act (CEA)",
        description: "CEA registration documentation and application support",
        qty: 1,
        govtFee: 10000,
        consultancyFee: 25000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 3,
        serviceName: "Biomedical Waste Authorization",
        description: "Documentation and compliance support",
        qty: 1,
        govtFee: 5000,
        consultancyFee: 10000,
        gstRate: 18,
        total: 17700
      }
    ],
    govtSubtotal: 30000,
    consultancySubtotal: 55000,
    subtotal: 85000,
    discount: 5000,
    taxableAmount: 80000,
    cgst: 7200,
    sgst: 7200,
    grandTotal: 94400,
    amountInWords: "Rupees Ninety-Four Thousand Four Hundred Only",
    paymentTerms: "50% Advance / 50% Completion"
  }
];

export const initialInvoices = [
  {
    id: "INV-2026-0001",
    invoiceNo: "INV-2026-0001",
    proformaNo: "PI-2026-0001",
    quotationNo: "QTN-2026-0004",
    clientId: "CL-0001",
    clientName: "ABC Multispeciality Hospital",
    contactPerson: "Mr. Ramesh",
    phone: "9876543210",
    email: "admin@abchospital.com",
    gstin: "33ABCDE1234F1Z5",
    address: "123 Mount Road, Chennai, Tamil Nadu - 600001",
    date: "2026-09-29",
    dueDate: "2026-10-29",
    status: "Partially Paid",
    items: [
      {
        id: 1,
        serviceName: "Fire NOC Consultancy",
        description: "Fire safety documentation and application support",
        qty: 1,
        govtFee: 15000,
        consultancyFee: 20000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 2,
        serviceName: "Clinical Establishment Act (CEA)",
        description: "CEA registration documentation and application support",
        qty: 1,
        govtFee: 10000,
        consultancyFee: 25000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 3,
        serviceName: "Biomedical Waste Authorization",
        description: "Documentation and compliance support",
        qty: 1,
        govtFee: 5000,
        consultancyFee: 10000,
        gstRate: 18,
        total: 17700
      }
    ],
    govtSubtotal: 30000,
    consultancySubtotal: 55000,
    subtotal: 85000,
    discount: 5000,
    taxableAmount: 80000,
    cgst: 7200,
    sgst: 7200,
    grandTotal: 94400,
    amountReceived: 50000,
    balanceAmount: 44400,
    amountInWords: "Rupees Ninety-Four Thousand Four Hundred Only",
    paymentTerms: "50% Advance / 50% Completion"
  },
  {
    id: "INV-2026-0002",
    invoiceNo: "INV-2026-0002",
    clientId: "CL-0002",
    clientName: "Sri Lakshmi Dental Clinic",
    date: "2026-09-28",
    dueDate: "2026-10-28",
    grandTotal: 35400,
    amountReceived: 35400,
    balanceAmount: 0,
    status: "Paid"
  },
  {
    id: "INV-2026-0003",
    invoiceNo: "INV-2026-0003",
    clientId: "CL-0004",
    clientName: "City Care Hospital",
    date: "2026-09-20",
    dueDate: "2026-10-20",
    grandTotal: 82600,
    amountReceived: 0,
    balanceAmount: 82600,
    status: "Partially Paid"
  }
];

export const initialPayments = [
  {
    id: "PAY-1001",
    invoiceNo: "INV-2026-0001",
    clientName: "ABC Multispeciality Hospital",
    date: "2026-09-30",
    amount: 50000,
    method: "UPI",
    refNo: "UPI123456"
  }
];
