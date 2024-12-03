const { Invoice, Event } = require('../models');
const PDFDocument = require('pdfkit-table');
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
    console.log('Invoice ID requested:', req.params.invoiceId);
    
    const invoice = await Invoice.findOne({ 
      invoiceId: req.params.invoiceId,
      society: req.user.society._id 
    })
    .populate('user', 'name email contactNumber')
    .populate('society', 'name')
    .populate('event');

    console.log('Found invoice:', JSON.stringify(invoice, null, 2));

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Validate required data
    if (!invoice.user?.name || !invoice.society?.name) {
      console.error('Missing required invoice data:', {
        userName: invoice.user?.name,
        societyName: invoice.society?.name,
        maintenanceAmount: invoice.maintenanceAmount,
        grandTotal: invoice.grandTotal
      });
      return res.status(400).json({ message: 'Invoice data incomplete' });
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `Invoice-${invoice.invoiceId}`,
        Author: invoice.society.name,
      }
    });

    // Force download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceId}.pdf"`);

    // Pipe PDF directly to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);

    // Add invoice details in a table-like format
    const startX = 50;
    const startY = 150;
    const lineHeight = 25;
    let currentY = startY;

    // Add society logo or name as header
    doc.fontSize(18).text(invoice.society.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);

    const details = [
      { label: 'Invoice ID', value: invoice.invoiceId },
      { label: 'Bill Date', value: new Date(invoice.billDate).toLocaleDateString() },
      { label: 'Name', value: invoice.user.name },
      { label: 'Email', value: invoice.user.email },
      { label: 'Phone', value: invoice.user.contactNumber || 'N/A' },
      { label: 'Society', value: invoice.society.name }
    ];

    // Draw a light rectangle for the details section
    doc.rect(startX - 10, currentY - 10, 500, (details.length + 1) * lineHeight)
       .fillOpacity(0.1)
       .fill();

    details.forEach(({ label, value }) => {
      // Draw in bold
      doc.font('Helvetica-Bold').text(label, startX, currentY);
      // Draw value in regular font
      doc.font('Helvetica').text(': ' + value, startX + 150, currentY);
      currentY += lineHeight;
    });

    currentY += lineHeight;
    doc.font('Helvetica-Bold').text('Amount Details', startX, currentY, { underline: true });
    currentY += lineHeight;

    const amounts = [
      { label: 'Maintenance Amount', value: `₹${invoice.maintenanceAmount?.toFixed(2) || '0.00'}` },
      { label: 'Penalty Amount', value: `₹${invoice.pendingAmount?.toFixed(2) || '0.00'}` },
      { label: 'Grand Total', value: `₹${invoice.grandTotal?.toFixed(2) || '0.00'}` }
    ];

    // Draw a light rectangle for the amounts section
    doc.rect(startX - 10, currentY - 10, 500, (amounts.length + 1) * lineHeight)
       .fillOpacity(0.1)
       .fill();

    amounts.forEach(({ label, value }) => {
      doc.font('Helvetica-Bold').text(label, startX, currentY);
      doc.font('Helvetica').text(value, startX + 150, currentY);
      currentY += lineHeight;
    });

    // Add footer
    doc.fontSize(10);
    doc.moveDown(4);
    doc.text('Thank you for your business!', { align: 'center' });
    doc.moveDown(0.5);
    doc.fillColor('gray').text('This is a computer generated invoice', { align: 'center' });
    doc.fillColor('black').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

    // Finalize PDF file
    doc.end();

  } catch (error) {
    console.error('Download invoice error:', error);
    res.status(500).json({ message: 'Error generating invoice: ' + error.message });
  }
}; 