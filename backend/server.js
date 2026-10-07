import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/clients.js';
import branchRoutes from './routes/branches.js';
import licenseRoutes from './routes/licenses.js';
import documentRoutes from './routes/documents.js';
import quotationRoutes from './routes/quotations.js';
import proformaRoutes from './routes/proformaInvoices.js';
import invoiceRoutes from './routes/invoices.js';
import paymentRoutes from './routes/payments.js';
import officeDocumentRoutes from './routes/officeDocuments.js';
import portalCredentialRoutes from './routes/portalCredentials.js';
import customizationRoutes from './routes/customization.js';
import employeeRoutes from './routes/employees.js';
import salarySlipRoutes from './routes/salarySlips.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB().catch(err => {
  console.warn('⚠️  MongoDB connection failed - server will run in limited mode');
  console.warn('📋 To fix: Whitelist your IP in MongoDB Atlas Network Access');
  console.warn('   Your IP: 106.222.220.189');
  console.warn('   Atlas: https://cloud.mongodb.com/v2/[PROJECT-ID]#/security/network/access');
  // Don't exit - server continues to run
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/proforma-invoices', proformaRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/office-documents', officeDocumentRoutes);
app.use('/api/portal-credentials', portalCredentialRoutes);
app.use('/api/customization', customizationRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/salary-slips', salarySlipRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SHA Compliance API is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/docs`);
});
