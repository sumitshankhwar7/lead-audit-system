const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, businessName } = req.body;

    if (!name || !email || !phone || !businessName) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const lead = new Lead({
      name,
      email,
      phone,
      businessName
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead saved successfully',
      lead
    });
  } catch (error) {
    console.error('Lead Creation Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Lead Fetch Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
