// ---------------------------------------------------------------------------
// Mock / seed data
// ---------------------------------------------------------------------------

export const DEMO_USERS = [
  {
    id: 'USR-001',
    name: 'Rahul Sharma',
    email: 'resident@societyhub.demo',
    password: 'resident123',
    phone: '9876543210',
    flat: 'A-204',
    role: 'resident',
  },
  {
    id: 'USR-002',
    name: 'Admin User',
    email: 'admin@societyhub.demo',
    password: 'admin123',
    phone: '9988776655',
    flat: 'Admin',
    role: 'admin',
  },
];

export const SEED_RESIDENTS = [
  { id: 'USR-001', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '9876543210', flat: 'A-204', paymentStatus: 'Paid' },
  { id: 'USR-003', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '9123456780', flat: 'B-102', paymentStatus: 'Paid' },
  { id: 'USR-004', name: 'Amit Verma', email: 'amit.verma@email.com', phone: '9012345678', flat: 'A-301', paymentStatus: 'Pending' },
  { id: 'USR-005', name: 'Sneha Iyer', email: 'sneha.iyer@email.com', phone: '9234567890', flat: 'C-105', paymentStatus: 'Paid' },
  { id: 'USR-006', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '9345678901', flat: 'B-203', paymentStatus: 'Pending' },
  { id: 'USR-007', name: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '9456789012', flat: 'A-102', paymentStatus: 'Paid' },
  { id: 'USR-008', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '9567890123', flat: 'C-301', paymentStatus: 'Paid' },
  { id: 'USR-009', name: 'Ananya Desai', email: 'ananya.desai@email.com', phone: '9678901234', flat: 'B-401', paymentStatus: 'Pending' },
];

export const SEED_COMPLAINTS = [
  {
    id: 'CMP-1001',
    title: 'Water leakage in Block A',
    category: 'Plumbing',
    description: 'Water is leaking near the staircase on the 2nd floor. The wall is getting damp and paint is peeling off. This needs urgent attention before it causes structural damage.',
    resident: 'Rahul Sharma',
    residentId: 'USR-001',
    flat: 'A-204',
    location: 'Block A',
    date: '2026-09-28',
    status: 'In Progress',
    adminResponse: 'Maintenance team has been assigned. The plumber will visit tomorrow between 10 AM – 12 PM.',
    timeline: [
      { status: 'Submitted', date: '2026-09-28', note: 'Complaint registered by resident.' },
      { status: 'In Progress', date: '2026-09-28', note: 'Assigned to maintenance team.' },
    ],
  },
  {
    id: 'CMP-1002',
    title: 'Lift not working in Block B',
    category: 'Lift',
    description: 'The lift in Block B has been out of service since yesterday evening. Senior citizens on upper floors are facing difficulties.',
    resident: 'Priya Patel',
    residentId: 'USR-003',
    flat: 'B-102',
    location: 'Block B',
    date: '2026-09-26',
    status: 'Resolved',
    adminResponse: 'Lift has been repaired. The motor unit was replaced. Please report if the issue recurs.',
    timeline: [
      { status: 'Submitted', date: '2026-09-26', note: 'Complaint registered by resident.' },
      { status: 'In Progress', date: '2026-09-26', note: 'Lift technician contacted.' },
      { status: 'Resolved', date: '2026-09-27', note: 'Motor replaced and lift is operational.' },
    ],
  },
  {
    id: 'CMP-1003',
    title: 'Parking space dispute',
    category: 'Parking',
    description: 'Another resident is regularly parking in my assigned parking spot (A-204). I have spoken to them but the issue persists.',
    resident: 'Rahul Sharma',
    residentId: 'USR-001',
    flat: 'A-204',
    location: 'Basement Parking',
    date: '2026-09-25',
    status: 'Submitted',
    adminResponse: '',
    timeline: [
      { status: 'Submitted', date: '2026-09-25', note: 'Complaint registered by resident.' },
    ],
  },
  {
    id: 'CMP-1004',
    title: 'Broken streetlight near Gate 2',
    category: 'Electrical',
    description: 'The streetlight near the main gate 2 has been flickering for a week and completely stopped working last night. This is a security concern.',
    resident: 'Amit Verma',
    residentId: 'USR-004',
    flat: 'A-301',
    location: 'Gate 2 Area',
    date: '2026-09-24',
    status: 'In Progress',
    adminResponse: 'Electrician has been notified. New bulb has been ordered.',
    timeline: [
      { status: 'Submitted', date: '2026-09-24', note: 'Complaint registered by resident.' },
      { status: 'In Progress', date: '2026-09-25', note: 'Electrician notified, parts ordered.' },
    ],
  },
  {
    id: 'CMP-1005',
    title: 'Garbage not collected from Block C',
    category: 'Cleaning',
    description: 'Garbage has not been collected from Block C for the last 2 days. The bins are overflowing and causing a foul smell.',
    resident: 'Sneha Iyer',
    residentId: 'USR-005',
    flat: 'C-105',
    location: 'Block C',
    date: '2026-09-23',
    status: 'Resolved',
    adminResponse: 'Housekeeping vendor has been warned. Daily collection has resumed.',
    timeline: [
      { status: 'Submitted', date: '2026-09-23', note: 'Complaint registered by resident.' },
      { status: 'In Progress', date: '2026-09-23', note: 'Vendor contacted.' },
      { status: 'Resolved', date: '2026-09-24', note: 'Garbage collected. Vendor warned.' },
    ],
  },
  {
    id: 'CMP-1006',
    title: 'CCTV camera not working at lobby',
    category: 'Security',
    description: 'The CCTV camera at the Block B lobby entrance has been offline for 3 days.',
    resident: 'Vikram Singh',
    residentId: 'USR-006',
    flat: 'B-203',
    location: 'Block B Lobby',
    date: '2026-09-22',
    status: 'Rejected',
    adminResponse: 'The camera is functional. It was undergoing firmware update. Please check again.',
    timeline: [
      { status: 'Submitted', date: '2026-09-22', note: 'Complaint registered by resident.' },
      { status: 'Rejected', date: '2026-09-23', note: 'Camera found functional after firmware update.' },
    ],
  },
  {
    id: 'CMP-1007',
    title: 'Cracks in common area wall',
    category: 'Common Area',
    description: 'There are visible cracks forming on the wall near the children\'s play area in the common garden.',
    resident: 'Neha Gupta',
    residentId: 'USR-007',
    flat: 'A-102',
    location: 'Common Garden',
    date: '2026-09-20',
    status: 'In Progress',
    adminResponse: 'Structural engineer visit has been scheduled for next week.',
    timeline: [
      { status: 'Submitted', date: '2026-09-20', note: 'Complaint registered by resident.' },
      { status: 'In Progress', date: '2026-09-21', note: 'Engineer visit scheduled.' },
    ],
  },
];

export const SEED_PAYMENTS = [
  { id: 'PAY-1001', month: 'September 2026', amount: 2500, date: '2026-09-10', status: 'Paid', transactionId: 'TXN-DEMO-100123' },
  { id: 'PAY-1002', month: 'August 2026', amount: 2500, date: '2026-08-09', status: 'Paid', transactionId: 'TXN-DEMO-100098' },
  { id: 'PAY-1003', month: 'July 2026', amount: 2500, date: '2026-07-10', status: 'Paid', transactionId: 'TXN-DEMO-100045' },
  { id: 'PAY-1004', month: 'June 2026', amount: 2500, date: '2026-06-10', status: 'Paid', transactionId: 'TXN-DEMO-100012' },
  { id: 'PAY-1005', month: 'May 2026', amount: 2500, date: '2026-05-11', status: 'Paid', transactionId: 'TXN-DEMO-099987' },
];

export const COMPLAINT_CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Lift',
  'Security',
  'Cleaning',
  'Parking',
  'Common Area',
  'Other',
];

export const CURRENT_DUE = {
  month: 'October 2026',
  amount: 2500,
  dueDate: '2026-10-10',
};
