const { Invoice, Event } = require('../models');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      society: req.user.society._id,
      status: 'pending'
    }).sort({ eventDate: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user._id,
      society: req.user.society._id
    })
    .populate('event')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Error fetching invoices' });
  }
};

exports.getMaintenanceInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user._id,
      society: req.user.society._id,
      type: 'maintenance'
    })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    console.error('Get maintenance invoices error:', error);
    res.status(500).json({ message: 'Error fetching maintenance invoices' });
  }
};

exports.getEventInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user._id,
      society: req.user.society._id,
      type: 'event'
    })
    .populate('event')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    console.error('Get event invoices error:', error);
    res.status(500).json({ message: 'Error fetching event invoices' });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    console.log('Download invoice request received:', {
      invoiceId: req.params.invoiceId,
      userId: req.user._id
    });
    
    // Find invoice without requiring society
    const invoice = await Invoice.findOne({ 
      invoiceId: req.params.invoiceId
    });

    console.log('Found invoice:', invoice ? invoice.toObject() : 'no');
    
    if (!invoice) {
      console.log('Invoice not found with ID:', req.params.invoiceId);
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceId}.pdf"`);

    // Pipe PDF directly to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);

    // Add invoice details
    const details = [
      { label: 'Invoice ID', value: invoice.invoiceId },
      { label: 'Bill Date', value: new Date(invoice.billDate).toLocaleDateString() },
      { label: 'Owner Name', value: invoice.ownerName },
      { label: 'Email', value: invoice.email },
      { label: 'Phone', value: invoice.phoneNumber }
    ];

    if (invoice.eventName) {
      details.push({ label: 'Event Name', value: invoice.eventName });
    }

    if (invoice.description) {
      details.push({ label: 'Description', value: invoice.description });
    }

    let y = 150;
    details.forEach(({ label, value }) => {
      doc.text(`${label}: ${value}`, 50, y);
      y += 25;
    });

    // Add amount details
    y += 25;
    doc.font('Helvetica-Bold').text('Amount Details', 50, y);
    y += 25;

    const amounts = [
      { label: 'Maintenance Amount', value: `₹${invoice.maintenanceAmount.toFixed(2)}` },
      { label: 'Penalty Amount', value: `₹${invoice.penaltyAmount.toFixed(2)}` },
      { label: 'Grand Total', value: `₹${(invoice.maintenanceAmount + invoice.penaltyAmount).toFixed(2)}` }
    ];

    amounts.forEach(({ label, value }) => {
      doc.text(`${label}: ${value}`, 50, y);
      y += 25;
    });

    // Add footer
    doc.fontSize(10);
    y = doc.page.height - 100;
    doc.text('This is a computer generated invoice', { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

    // Finalize PDF file
    doc.end();

  } catch (error) {
    console.error('Download invoice error:', {
      error: error.message,
      stack: error.stack,
      invoiceId: req.params.invoiceId
    });
    
    // Send error as JSON instead of trying to send as PDF
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      message: 'Error generating invoice',
      error: error.message
    });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const {
      invoiceId,
      maintenanceAmount,
      penaltyAmount = 0,
      eventId = null,
      billDate = new Date(),
      ownerName,
      email,
      phoneNumber,
      eventName,
      description
    } = req.body;

    console.log('Creating invoice with data:', {
      invoiceId,
      maintenanceAmount,
      penaltyAmount,
      eventId,
      billDate,
      ownerName,
      email,
      phoneNumber,
      eventName,
      description,
      userId: req.user?._id
    });

    if (!req.user?._id) {
      console.error('Missing user ID');
      return res.status(400).json({ message: 'Missing user information' });
    }

    // Check if invoice already exists
    const existingInvoice = await Invoice.findOne({ invoiceId });
    if (existingInvoice) {
      console.log('Invoice already exists, returning existing invoice');
      return res.status(200).json({
        message: 'Invoice already exists',
        invoice: existingInvoice
      });
    }

    // Create new invoice without requiring society
    const invoiceData = {
      invoiceId,
      event: eventId,
      user: req.user._id,
      billDate,
      maintenanceAmount,
      penaltyAmount,
      grandTotal: maintenanceAmount + penaltyAmount,
      status: 'pending',
      ownerName,
      email,
      phoneNumber,
      eventName,
      description
    };

    // Only add society if it exists
    if (req.user.society) {
      invoiceData.society = req.user.society;
    }

    const invoice = new Invoice(invoiceData);
    console.log('Invoice model created:', invoice.toObject());

    await invoice.save();
    console.log('Invoice saved successfully');

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: {
        invoiceId: invoice.invoiceId,
        maintenanceAmount: invoice.maintenanceAmount,
        penaltyAmount: invoice.penaltyAmount,
        grandTotal: invoice.grandTotal,
        status: invoice.status,
        ownerName: invoice.ownerName,
        email: invoice.email,
        phoneNumber: invoice.phoneNumber,
        eventName: invoice.eventName,
        description: invoice.description
      }
    });
  } catch (error) {
    console.error('Create invoice error:', {
      error: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    // Check for specific MongoDB errors
    if (error.code === 11000) {
      return res.status(200).json({ 
        message: 'Invoice already exists',
        error: error.message
      });
    }

    // Check for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({ 
      message: 'Error creating invoice', 
      error: error.message,
      details: error.errors,
      code: error.code,
      name: error.name
    });
  }
}; 