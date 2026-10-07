# MongoDB Implementation Guide - SHA Compliance Application

## 🎯 Current Status

### ✅ Completed
- MongoDB Atlas credentials configured in `.env`
- Server setup with Express and MongoDB connection
- Client model created with proper schema
- Client routes implemented (GET, POST, PUT, DELETE)
- Authentication middleware configured
- CORS and middleware setup

### ⏳ To Implement
1. Complete remaining models (License, Quotation, Invoice, etc.)
2. Implement all API routes
3. Update frontend to call APIs instead of mock data
4. Real-time data synchronization

---

## 📦 Database Models to Create

### 1. **Client Model** ✅
```
- name, email, phone, contactPerson, address, gstin
- status, outstanding, activeLicenses, pendingDocuments
- timestamps
```

### 2. **License Model** (In Progress)
```
- licenseMasterId, licenseName, description
- clientId, status, stage
- applicationDate, expectedSubmission, targetApprovalDate, renewalDate
- govtFee, consultancyFee, validity, timeline
- documents array
```

### 3. **Quotation Model**
```
- quotationNo, date, validUntil, status
- clientId, clientName, contactPerson
- items array (serviceName, description, qty, govtFee, consultancyFee, gstRate)
- govtSubtotal, consultancySubtotal, discount, cgst, sgst, grandTotal
- paymentTerms, amountInWords
```

### 4. **Proforma Invoice Model**
```
- proformaNo, quotationId, date, validUntil, status
- clientId, clientName, address, gstin
- items (same as quotation)
- totals (govtSubtotal, consultancySubtotal, cgst, sgst, grandTotal)
```

### 5. **Invoice Model**
```
- invoiceNo, proformaId, date, dueDate, status
- clientId, clientName, address, gstin
- items array
- totals (govtSubtotal, consultancySubtotal, cgst, sgst, grandTotal)
- amountReceived, balanceAmount
```

### 6. **Payment Model**
```
- invoiceNo, clientName, date, amount
- method (UPI, Bank Transfer, Cheque, Cash)
- referenceNumber
- status
```

### 7. **Document Model**
```
- clientLicenseId, docName, description
- status (Submitted, Pending, Approved, Requested)
- fileName, fileSize, uploadDate
- mandatory flag, remarks
```

### 8. **Portal Credentials Model**
```
- clientLicenseId, portalName, portalUrl
- username, password (encrypted), loginType
- securityQuestion, securityAnswer (encrypted)
- registeredEmail, registeredMobile
- remarks, createdAt, updatedAt
```

### 9. **Office Documents Model**
```
- name, category, fileSize, uploadDate
- fileName, status
- createdBy, createdAt
```

---

## 🔗 API Endpoints Structure

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Licenses
- `GET /api/licenses` - Get all licenses
- `GET /api/licenses/:id` - Get single license
- `POST /api/licenses` - Create license
- `PUT /api/licenses/:id` - Update license
- `DELETE /api/licenses/:id` - Delete license
- `GET /api/licenses/client/:clientId` - Get licenses by client

### Quotations
- `GET /api/quotations` - Get all quotations
- `GET /api/quotations/:id` - Get quotation
- `POST /api/quotations` - Create quotation
- `PUT /api/quotations/:id` - Update quotation
- `DELETE /api/quotations/:id` - Delete quotation

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Record payment
- `GET /api/payments/invoice/:invoiceId` - Get payments for invoice

### Documents
- `GET /api/documents/license/:licenseId` - Get license documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/:id` - Delete document

### Portal Credentials
- `GET /api/portal-credentials/license/:licenseId` - Get portal credentials
- `POST /api/portal-credentials` - Add portal credentials
- `PUT /api/portal-credentials/:id` - Update credentials
- `DELETE /api/portal-credentials/:id` - Delete credentials

### Office Documents
- `GET /api/office-documents` - Get all office documents
- `POST /api/office-documents` - Upload office document
- `DELETE /api/office-documents/:id` - Delete office document

---

## 🚀 Setup Instructions

### Step 1: Start Backend Server
```bash
cd backend
npm install
node server.js
```

The server will:
- Connect to MongoDB Atlas using credentials in `.env`
- Start on `http://localhost:5000`
- Ready to receive API requests

### Step 2: Update Frontend AppContext
Replace mock data initialization with API calls:

```javascript
// Before (Mock Data)
const [clients, setClients] = useState(initialClients);

// After (Real API)
useEffect(() => {
  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_URL}/clients`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setClients(data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };
  fetchClients();
}, [token]);
```

### Step 3: Update Frontend Functions
Convert all CRUD operations to API calls:

```javascript
// Example: Save Client
const addClient = async (clientData) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
    const data = await response.json();
    if (data.success) {
      setClients([data.data, ...clients]);
    }
  } catch (error) {
    console.error('Error creating client:', error);
  }
};
```

---

## 🔐 Security Implementation

### Authentication
- JWT tokens expire after 7 days
- Refresh tokens for long sessions
- Role-based access control (CEO, Manager, Staff)

### Data Protection
- Passwords hashed with bcryptjs (10 salt rounds)
- Portal credentials encrypted
- Sensitive data never logged

### API Security
- CORS enabled for localhost:3000 only
- Rate limiting (implement express-rate-limit)
- Input validation on all endpoints
- SQL injection prevention (Mongoose escaping)

---

## 📊 Real-Time Features

### WebSocket Implementation (Optional)
```javascript
// For real-time updates
const socket = io('http://localhost:5000');

socket.on('client:updated', (data) => {
  setClients(clients.map(c => c._id === data._id ? data : c));
});
```

### Or Use Polling
```javascript
// Poll every 30 seconds
setInterval(async () => {
  const response = await fetch(`${API_URL}/clients`);
  const data = await response.json();
  setClients(data.data);
}, 30000);
```

---

## ✅ Testing API Endpoints

### Using Postman
1. Import API collection
2. Set Authorization header with JWT token
3. Test each endpoint

### Using cURL
```bash
# Get all clients
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/clients

# Create client
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "ABC Hospital",
    "email": "admin@abc.com",
    "phone": "9876543210"
  }'
```

---

## 🐛 Debugging

### Check Backend Connection
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK","message":"SHA Compliance API is running"}
```

### Monitor MongoDB
- Login to MongoDB Atlas dashboard
- Check Collections > sha_compliance
- Verify documents are being created/updated

### View Logs
```bash
# Backend logs show connection status
# Check for "Connected to MongoDB" message
```

---

## 📝 Next Steps

1. **Implement remaining models** (License, Quotation, Invoice, etc.)
2. **Create all route files** for each model
3. **Update AppContext** to fetch from APIs
4. **Update all components** to use API calls
5. **Add error handling** and loading states
6. **Implement real-time updates** (WebSocket or polling)
7. **Add data validation** on frontend and backend
8. **Performance testing** with large datasets

---

## 🎉 Benefits of MongoDB Implementation

✅ **Real-time data** - Single source of truth  
✅ **Scalability** - Handle millions of records  
✅ **Persistence** - Data survives app restarts  
✅ **Multi-user** - Concurrent access from multiple users  
✅ **Audit trail** - Track all changes with timestamps  
✅ **Backups** - MongoDB Atlas automatic backups  
✅ **Security** - Encrypted connections, role-based access  

---

## 📞 Support
For implementation questions, refer to:
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guides](https://expressjs.com)
- [Mongoose ODM](https://mongoosejs.com)
