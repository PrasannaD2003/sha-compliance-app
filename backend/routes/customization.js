import express from 'express';
import DocumentCustomization from '../models/DocumentCustomization.js';
import { authenticate, checkPermission } from '../middleware/auth.js';

const router = express.Router();

router.get('/:documentType', authenticate, async (req, res) => {
  try {
    const customizations = await DocumentCustomization.find({
      userId: req.user.id,
      documentType: req.params.documentType
    });
    res.json(customizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:documentType/default', authenticate, async (req, res) => {
  try {
    const customization = await DocumentCustomization.findOne({
      userId: req.user.id,
      documentType: req.params.documentType,
      isDefault: true
    });
    res.json(customization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, checkPermission('canCustomize'), async (req, res) => {
  try {
    const { documentType, customizationName, ...config } = req.body;

    const customization = new DocumentCustomization({
      userId: req.user.id,
      documentType,
      customizationName,
      ...config
    });

    await customization.save();
    res.status(201).json(customization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, checkPermission('canCustomize'), async (req, res) => {
  try {
    const customization = await DocumentCustomization.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(customization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/set-default', authenticate, checkPermission('canCustomize'), async (req, res) => {
  try {
    const customization = await DocumentCustomization.findById(req.params.id);

    if (customization.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await DocumentCustomization.updateMany(
      { userId: req.user.id, documentType: customization.documentType },
      { isDefault: false }
    );

    customization.isDefault = true;
    await customization.save();

    res.json(customization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, checkPermission('canCustomize'), async (req, res) => {
  try {
    const customization = await DocumentCustomization.findById(req.params.id);

    if (customization.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await DocumentCustomization.deleteOne({ _id: req.params.id });
    res.json({ message: 'Customization deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:documentType/reset-defaults', authenticate, checkPermission('canCustomize'), async (req, res) => {
  try {
    const defaultCustomization = {
      userId: req.user.id,
      documentType: req.params.documentType,
      customizationName: 'Default',
      isDefault: true,
      headerConfig: {
        showLogo: true,
        showCompanyDetails: true,
        headerColor: '#0f172a',
        headerBackgroundColor: '#ffffff'
      },
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
        showSignature: true,
        showBankDetails: false,
        showNotes: true
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
    };

    await DocumentCustomization.deleteMany({
      userId: req.user.id,
      documentType: req.params.documentType
    });

    const customization = new DocumentCustomization(defaultCustomization);
    await customization.save();

    res.json(customization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
