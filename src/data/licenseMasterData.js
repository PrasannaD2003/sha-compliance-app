export const masterLicensesList = [
  {
    id: 'LIC-CEA',
    name: 'Clinical Establishment Act (CEA)',
    category: 'Hospital Registration',
    governingAuthority: 'Health & Family Welfare Department, Govt of Tamil Nadu',
    portal: 'tncea.tn.gov.in',
    licenseType: 'Mandatory Healthcare License',
    validity: '5 Years',
    renewalFrequency: '5 Years',
    govtFee: 10000,
    consultancyFee: 25000,
    processingTime: '45 - 60 working days',
    requiredDocuments: [
      { id: 'doc-1', name: 'CEA Application Form', description: 'Duly filled CEA application form', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'doc-2', name: 'Identity Proof of Applicant', description: 'Aadhar / PAN of authorised person', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'doc-3', name: 'Photo of Authorised Person', description: 'Passport size photo', mandatory: true, fileType: 'JPG/PNG', expiryRequired: false },
      { id: 'doc-4', name: 'Address Proof of Establishment', description: 'EB Bill / Rent Agreement / Sale Deed', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'doc-5', name: 'Ownership Proof', description: 'Ownership or lease agreement', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'doc-6', name: 'Building Plan Approval', description: 'CMDA / DTCP approved plan', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'doc-7', name: 'NOC from Local Body', description: 'Corporation / Municipality NOC', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'doc-8', name: 'List of Medical Equipment', description: 'Equipment list with specifications', mandatory: false, fileType: 'XLSX/PDF', expiryRequired: false },
      { id: 'doc-9', name: 'Layout Plan', description: 'Internal layout plan of the establishment', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'doc-10', name: 'Affidavit', description: 'Affidavit in prescribed format on Rs.100 stamp paper', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-FIRE',
    name: 'Fire NOC',
    category: 'Safety & Building Compliance',
    governingAuthority: 'Tamil Nadu Fire & Rescue Services Department',
    portal: 'tnfrs.tn.gov.in',
    licenseType: 'NOC Clearance',
    validity: '1 Year',
    renewalFrequency: '1 Year',
    govtFee: 15000,
    consultancyFee: 20000,
    processingTime: '30 - 45 working days',
    requiredDocuments: [
      { id: 'fire-1', name: 'Fire NOC Application', description: 'Prescribed Fire NOC application format', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fire-2', name: 'Approved Building Layout', description: 'Floor plans showing fire escape & hydrants', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fire-3', name: 'Building Stability Certificate', description: 'Structural engineer stability report', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'fire-4', name: 'Fire Equipment Vendor Invoice', description: 'Extinguisher & hose reel test certificates', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'fire-5', name: 'Electrical Safety Certificate', description: 'Licensed A-grade contractor certificate', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'fire-6', name: 'Ownership / Rent Deed', description: 'Property deed or agreement', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'fire-7', name: 'Applicant Identity Card', description: 'PAN & Aadhar card of Managing Director', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fire-8', name: 'Challan Receipt', description: 'Government fee payment challan', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-BMW',
    name: 'Biomedical Waste Authorization',
    category: 'Environmental Compliance',
    governingAuthority: 'Tamil Nadu Pollution Control Board (TNPCB)',
    portal: 'tnpcb.gov.in',
    licenseType: 'Environmental Authorization',
    validity: '3 Years',
    renewalFrequency: '3 Years',
    govtFee: 5000,
    consultancyFee: 10000,
    processingTime: '20 - 30 working days',
    requiredDocuments: [
      { id: 'bmw-1', name: 'Form II Application', description: 'Application under Bio-Medical Waste Rules 2016', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-2', name: 'CBMWTF Agreement Copy', description: 'Common Bio-medical waste facility agreement', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'bmw-3', name: 'Bed Count Certificate', description: 'Sanctioned bed capacity certificate', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-4', name: 'BMW Logbook Copy', description: 'Daily generation logbook sample page', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-5', name: 'Water & Electricity Bills', description: 'Latest utility bills', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-6', name: 'Site Plan', description: 'Location map & waste storage room plan', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-7', name: 'Authorization Fee Receipt', description: 'TNPCB Online fee receipt', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'bmw-8', name: 'Staff Immunization Record', description: 'Hepatitis B & Tetanus vaccine records', mandatory: true, fileType: 'PDF', expiryRequired: true }
    ]
  },
  {
    id: 'LIC-PCPNDT',
    name: 'PCPNDT License',
    category: 'Radiology & Ultrasound',
    governingAuthority: 'District Appropriate Authority (PCPNDT Cell)',
    portal: 'tnhealth.tn.gov.in',
    licenseType: 'Ultrasound / Imaging Permit',
    validity: '5 Years',
    renewalFrequency: '5 Years',
    govtFee: 25000,
    consultancyFee: 30000,
    processingTime: '60 working days',
    requiredDocuments: [
      { id: 'pc-1', name: 'Form A Application', description: 'PCPNDT registration application form', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pc-2', name: 'Sonologist Qualification', description: 'MD Radiology / PG Diploma / Training certificate', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pc-3', name: 'Medical Council Registration', description: 'TN Medical Council MBBS & PG registration', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'pc-4', name: 'Machine Sale Invoice & Serial No', description: 'Ultrasound scanner purchase bill & probe list', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pc-5', name: 'Premises Layout Plan', description: 'Ultrasound room dimension plan', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pc-6', name: 'Affidavit under PCPNDT Act', description: 'Non-sex determination undertaking', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pc-7', name: 'Registration Fee Demand Draft', description: 'Government DD fee receipt', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-TNPCB',
    name: 'TNPCB Consent (CTE & CTO)',
    category: 'Environmental Compliance',
    governingAuthority: 'Tamil Nadu Pollution Control Board',
    portal: 'tnocmms.nic.in',
    licenseType: 'Consent to Operate',
    validity: '5 Years',
    renewalFrequency: '5 Years',
    govtFee: 20000,
    consultancyFee: 30000,
    processingTime: '45 working days',
    requiredDocuments: [
      { id: 'pcb-1', name: 'OCMMS Online Application', description: 'CTE / CTO application generated form', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pcb-2', name: 'ETP & STP Design Report', description: 'Effluent treatment plant layout & specs', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pcb-3', name: 'Water Balance Diagram', description: 'Water source, consumption & discharge chart', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'pcb-4', name: 'Land Availability Deed', description: 'Patta / Lease deed for hospital site', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'pcb-5', name: 'DG Set Acoustic Certificate', description: 'Generator noise level compliance report', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'pcb-6', name: 'Gross Fixed Assets Auditor Cert', description: 'CA certificate for total project cost', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-AERB',
    name: 'AERB Registration (X-Ray & C-Arm)',
    category: 'Radiation Safety',
    governingAuthority: 'Atomic Energy Regulatory Board (AERB)',
    portal: 'elora.aerb.gov.in',
    licenseType: 'Radiation Equipment Permit',
    validity: '5 Years',
    renewalFrequency: '5 Years',
    govtFee: 15000,
    consultancyFee: 25000,
    processingTime: '30 working days',
    requiredDocuments: [
      { id: 'aerb-1', name: 'eLORA Institute Registration', description: 'AERB eLORA portal account proof', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'aerb-2', name: 'Lead Shielding Layout Plan', description: 'Room layout showing lead doors & lead glass', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'aerb-3', name: 'Quality Assurance (QA) Report', description: 'NABL accredited QA testing report', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'aerb-4', name: 'RSO Certificate', description: 'Radiation Safety Officer appointment & certificate', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'aerb-5', name: 'TLD Badges Allotment Letter', description: 'Personal monitoring TLD badge allotment', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'aerb-6', name: 'Equipment Procurement NOC', description: 'AERB approval for X-Ray / C-Arm purchase', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-DRUG',
    name: 'Pharmacy / Drug License (Form 20 & 21)',
    category: 'Pharmacy & Medical Stores',
    governingAuthority: 'Drugs Control Department, Tamil Nadu',
    portal: 'tnhealth.tn.gov.in',
    licenseType: 'Retail & Wholesale Pharmacy License',
    validity: '5 Years',
    renewalFrequency: '5 Years',
    govtFee: 12000,
    consultancyFee: 18000,
    processingTime: '30 working days',
    requiredDocuments: [
      { id: 'drg-1', name: 'Drug License Application', description: 'Form 19 application for retail pharmacy', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'drg-2', name: 'Pharmacist Registration', description: 'Pharmacy Council registration certificate', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'drg-3', name: 'Pharmacist Appointment Letter', description: 'Full-time employment declaration', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'drg-4', name: 'Pharmacy Plan Layout', description: 'Blueprint showing minimum 10 sq.m area & refrigerator', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'drg-5', name: 'Refrigerator Invoice', description: 'Bill for cold storage unit for vaccines', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'drg-6', name: 'Premises Rental Agreement', description: 'Registered lease agreement for pharmacy premises', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'drg-7', name: 'Challan Fee Copy', description: 'Government treasury fee receipt', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  },
  {
    id: 'LIC-FSSAI',
    name: 'FSSAI Food License (Hospital Canteen)',
    category: 'Food Safety & Hygiene',
    governingAuthority: 'Food Safety and Standards Authority of India',
    portal: 'foscos.fssai.gov.in',
    licenseType: 'State Food License',
    validity: '3 Years',
    renewalFrequency: '3 Years',
    govtFee: 7500,
    consultancyFee: 12000,
    processingTime: '15 working days',
    requiredDocuments: [
      { id: 'fss-1', name: 'FSSAI Form B Application', description: 'FoSCoS online license application', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fss-2', name: 'Water Test Analysis Report', description: 'Potable water NABL lab testing report', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'fss-3', name: 'Food Safety Management Plan', description: 'FSMS plan for hospital dietary kitchen', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fss-4', name: 'Proprietor / Director ID Proof', description: 'PAN / Aadhar card', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'fss-5', name: 'Canteen Premises Deed', description: 'Rent deed or allotment letter', mandatory: true, fileType: 'PDF', expiryRequired: true }
    ]
  },
  {
    id: 'LIC-TRADE',
    name: 'Trade License',
    category: 'Local Municipal Compliance',
    governingAuthority: 'Greater Chennai Corporation / Local Municipality',
    portal: 'chennaicorporation.gov.in',
    licenseType: 'Commercial Trade License',
    validity: '1 Year',
    renewalFrequency: '1 Year',
    govtFee: 8000,
    consultancyFee: 12000,
    processingTime: '15 working days',
    requiredDocuments: [
      { id: 'trd-1', name: 'Trade License Application', description: 'Municipal trade license form', mandatory: true, fileType: 'PDF', expiryRequired: false },
      { id: 'trd-2', name: 'Property Tax Receipt', description: 'Latest paid property tax receipt', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'trd-3', name: 'Fire NOC Copy', description: 'Valid Fire NOC certificate copy', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'trd-4', name: 'Rent Deed / Lease Copy', description: 'Commercial premises lease agreement', mandatory: true, fileType: 'PDF', expiryRequired: true },
      { id: 'trd-5', name: 'GST Registration Copy', description: 'GSTIN certificate copy', mandatory: true, fileType: 'PDF', expiryRequired: false }
    ]
  }
];
