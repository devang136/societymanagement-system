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
    const { id } = req.params;

    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid invoice ID format' });
    }

    const invoice = await Invoice.findOne({ _id: id })
      .populate('event')
      .populate('user', 'name email')
      .populate('society', 'name');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceId}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();

    // Add invoice details
    doc.fontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceId}`);
    doc.text(`Date: ${invoice.billDate.toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Society: ${invoice.society.name}`);
    doc.moveDown();

    doc.text('Bill To:');
    doc.text(invoice.user.name);
    doc.text(invoice.user.email);
    doc.moveDown();

    // Add table
    const table = {
      headers: ['Description', 'Amount'],
      rows: [
        ['Event Name', invoice.event.eventName],
        ['Event Date', new Date(invoice.event.eventDate).toLocaleDateString()],
        ['Event Amount', `₹${invoice.event.amount}`],
        ['Maintenance Amount', `₹${invoice.maintenanceAmount}`]
      ]
    };

    if (invoice.penaltyAmount > 0) {
      table.rows.push(['Penalty Amount', `₹${invoice.penaltyAmount}`]);
    }

    table.rows.push(['Grand Total', `₹${invoice.grandTotal}`]);

    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold'),
      prepareRow: () => doc.font('Helvetica')
    });

    // Add footer
    doc.moveDown();
    doc.fontSize(10)
      .text('This is a computer generated invoice.', { align: 'center' })
      .text('For any queries, please contact society management.', { align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Download invoice error:', error);
    res.status(500).json({ message: 'Error generating invoice PDF' });
  }
}; 