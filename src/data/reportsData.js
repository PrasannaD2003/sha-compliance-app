export const initialDailyFollowups = [
  {
    id: 1,
    followupId: 'FOL-101',
    client: 'ABC Multispeciality Hospital',
    task: 'Collect Ownership Proof',
    license: 'CEA',
    dueDate: '2026-09-29',
    assignedTo: 'Mr. Kumar',
    priority: 'High',
    status: 'Pending',
    type: 'Documents',
    lastFollowup: '2026-09-25',
    nextFollowup: '2026-09-30'
  },
  {
    id: 2,
    followupId: 'FOL-102',
    client: 'Sri Lakshmi Dental Clinic',
    task: 'Follow up Fire NOC Inspection',
    license: 'Fire NOC',
    dueDate: '2026-09-29',
    assignedTo: 'Ms. Priya',
    priority: 'Medium',
    status: 'In Progress',
    type: 'Applications',
    lastFollowup: '2026-09-28',
    nextFollowup: '2026-09-30'
  },
  {
    id: 3,
    followupId: 'FOL-103',
    client: 'Medicare Hospital',
    task: 'Submit Query Response',
    license: 'PCPNDT',
    dueDate: '2026-09-29',
    assignedTo: 'Mr. Suresh',
    priority: 'High',
    status: 'Pending',
    type: 'Queries',
    lastFollowup: '2026-09-26',
    nextFollowup: '2026-09-30'
  },
  {
    id: 4,
    followupId: 'FOL-104',
    client: 'City Care Hospital',
    task: 'Application Submission',
    license: 'TNPCB',
    dueDate: '2026-09-29',
    assignedTo: 'Mr. Ramesh',
    priority: 'High',
    status: 'In Progress',
    type: 'Applications',
    lastFollowup: '2026-09-28',
    nextFollowup: '2026-09-29'
  },
  {
    id: 5,
    followupId: 'FOL-105',
    client: 'Life Line Clinic',
    task: 'Collect Equipment List',
    license: 'CEA',
    dueDate: '2026-09-29',
    assignedTo: 'Ms. Priya',
    priority: 'Medium',
    status: 'Pending',
    type: 'Documents',
    lastFollowup: '2026-09-27',
    nextFollowup: '2026-09-30'
  },
  {
    id: 6,
    followupId: 'FOL-106',
    client: 'Apollo Speciality Hospital',
    task: 'Follow up MTP License Renewal',
    license: 'MTP License',
    dueDate: '2026-09-29',
    assignedTo: 'Mr. Kumar',
    priority: 'High',
    status: 'Overdue',
    type: 'Renewals',
    lastFollowup: '2026-09-20',
    nextFollowup: '2026-09-29'
  }
];

export const monthlyProgressData = [
  { month: 'April', applications: 22, approved: 15, pending: 8, rejected: 2 },
  { month: 'May', applications: 22, approved: 16, pending: 7, rejected: 2 },
  { month: 'June', applications: 32, approved: 22, pending: 12, rejected: 3 },
  { month: 'July', applications: 25, approved: 18, pending: 10, rejected: 2 },
  { month: 'August', applications: 29, approved: 20, pending: 11, rejected: 3 },
  { month: 'September', applications: 31, approved: 21, pending: 13, rejected: 4 }
];

export const upcomingRenewalsData = [
  { id: 1, client: 'ABC Multispeciality Hospital', license: 'MTP License', renewalDate: '2026-10-15', daysLeft: 16, person: 'Mr. Ramesh', status: 'Due Soon' },
  { id: 2, client: 'City Care Hospital', license: 'C-ARM AERB', renewalDate: '2026-11-30', daysLeft: 62, person: 'Mr. Suresh', status: 'Upcoming' },
  { id: 3, client: 'Life Line Clinic', license: 'Fire NOC', renewalDate: '2026-12-10', daysLeft: 72, person: 'Ms. Priya', status: 'Upcoming' }
];

export const licenseStatusByClientData = [
  { client: 'ABC Multispeciality Hospital', total: 5, completed: 1, inProgress: 2, notStarted: 2, overdue: 0 },
  { client: 'Sri Lakshmi Dental Clinic', total: 4, completed: 2, inProgress: 1, notStarted: 1, overdue: 1 },
  { client: 'Medicare Hospital', total: 6, completed: 4, inProgress: 1, notStarted: 1, overdue: 0 },
  { client: 'City Care Hospital', total: 3, completed: 1, inProgress: 2, notStarted: 0, overdue: 0 },
  { client: 'Life Line Clinic', total: 2, completed: 1, inProgress: 0, notStarted: 1, overdue: 0 }
];

export const licenseWiseStatusData = [
  { license: 'Clinical Establishment Act', total: 28, completed: 14, inProgress: 8, notStarted: 5, overdue: 1 },
  { license: 'Fire NOC', total: 24, completed: 12, inProgress: 8, notStarted: 3, overdue: 1 },
  { license: 'Biomedical Waste', total: 22, completed: 16, inProgress: 4, notStarted: 2, overdue: 0 },
  { license: 'PCPNDT', total: 18, completed: 8, inProgress: 6, notStarted: 4, overdue: 0 },
  { license: 'TNPCB Consent', total: 16, completed: 6, inProgress: 6, notStarted: 4, overdue: 0 }
];

export const pendingDocumentsReportData = [
  { id: 1, client: 'ABC Multispeciality Hospital', document: 'Ownership Proof', license: 'CEA', assignedTo: 'Mr. Kumar', requestedDate: '2026-09-20', dueDate: '2026-09-30', daysPending: 10, status: 'Pending' },
  { id: 2, client: 'City Care Hospital', document: 'Layout Plan', license: 'CEA', assignedTo: 'Ms. Priya', requestedDate: '2026-09-21', dueDate: '2026-09-29', daysPending: 8, status: 'Pending' },
  { id: 3, client: 'Medicare Hospital', document: 'Equipment List', license: 'CEA', assignedTo: 'Mr. Suresh', requestedDate: '2026-09-23', dueDate: '2026-09-29', daysPending: 6, status: 'Pending' },
  { id: 4, client: 'Sri Lakshmi Dental Clinic', document: 'Fire NOC', license: 'Fire NOC', assignedTo: 'Mr. Kumar', requestedDate: '2026-09-24', dueDate: '2026-09-29', daysPending: 5, status: 'Pending' },
  { id: 5, client: 'Life Line Clinic', document: 'Staff Details', license: 'CEA', assignedTo: 'Ms. Priya', requestedDate: '2026-09-25', dueDate: '2026-09-29', daysPending: 4, status: 'Pending' }
];

export const actionRequiredData = [
  { id: 1, client: 'ABC Hospital', issue: 'Collect CEA Ownership Proof', person: 'Mr. Kumar', dueDate: '2026-09-30', priority: 'High' },
  { id: 2, client: 'Medicare Hospital', issue: 'Submit PCPNDT Query Response', person: 'Mr. Suresh', dueDate: '2026-09-30', priority: 'High' },
  { id: 3, client: 'City Care Hospital', issue: 'Submit TNPCB Application', person: 'Mr. Ramesh', dueDate: '2026-10-02', priority: 'High' },
  { id: 4, client: 'Sri Lakshmi Dental', issue: 'Fire NOC Follow-up', person: 'Ms. Priya', dueDate: '2026-10-05', priority: 'Medium' }
];

export const todayActivityTimeline = [
  { time: '09:15 AM', event: 'Document uploaded', detail: 'Fire NOC – ABC Hospital', person: 'Mr. Kumar' },
  { time: '10:05 AM', event: 'Query raised', detail: 'PCPNDT – Medicare Hospital', person: 'Mr. Suresh' },
  { time: '11:20 AM', event: 'Application submitted', detail: 'TNPCB – City Care Hospital', person: 'Mr. Ramesh' },
  { time: '12:10 PM', event: 'New client added', detail: 'Green Life Hospital', person: 'Admin User' },
  { time: '12:45 PM', event: 'License approved', detail: 'Biomedical Waste – Sri Lakshmi Dental', person: 'Rajesh Kumar' }
];
