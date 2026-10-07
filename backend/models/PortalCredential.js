import mongoose from 'mongoose';

const portalCredSchema = new mongoose.Schema({
  clientLicenseId: String,
  portalName: String,
  portalUrl: String,
  username: String,
  password: String,
  loginType: String,
  remarks: String,
  securityQuestion: String,
  securityAnswer: String,
  registeredEmail: String,
  registeredMobile: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PortalCredential', portalCredSchema);
