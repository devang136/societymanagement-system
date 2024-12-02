const { Invoice, Event } = require('../models');
const PDFDocument = require('pdfkit-table');

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

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      user: req.user._id,
      society: req.user.society._id
    })
    .populate('event')
    .populate('user', 'name email contactNumber')
    .sort({ createdAt: -1 });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const formattedInvoice = {
      _id: invoice._id,
      invoiceId: invoice.invoiceId,
      ownerName: invoice.user.name,
      billDate: invoice.billDate.toLocaleDateString(),
      paymentDate: invoice.paymentDate ? invoice.paymentDate.toLocaleDateString() : '-',
      phoneNumber: invoice.user.contactNumber,
      email: invoice.user.email,
      eventName: invoice.event.eventName,
      description: `Payment for ${invoice.event.eventName} event`,
      maintenanceAmount: invoice.maintenanceAmount,
      grandTotal: invoice.grandTotal
    };

    res.json(formattedInvoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Error fetching invoice' });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email contactNumber')
      .populate('society', 'name');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceId}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add letterhead
    doc.fontSize(20).text('Society Management System', { align: 'center' });
    doc.fontSize(16).text('Event Invoice', { align: 'center' });
    doc.moveDown();

    // Add invoice header
    doc.fontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceId}`);
    doc.text(`Date: ${invoice.billDate.toLocaleDateString()}`);
    doc.moveDown();

    // Add society details
    doc.text(`Society: ${invoice.society.name}`);
    doc.moveDown();

    // Add billing details
    doc.text('Bill To:');
    doc.text(invoice.user.name);
    doc.text(invoice.user.email);
    doc.text(invoice.user.contactNumber);
    doc.moveDown();

    // Add event details in a table
    const table = {
      headers: ['Description', 'Amount'],
      rows: [
        ['Event Name', invoice.event.eventName],
        ['Event Date', invoice.event.eventDate.toLocaleDateString()],
        ['Event Amount', `₹${invoice.event.amount.toFixed(2)}`],
        ['Maintenance Charge', `₹${invoice.maintenanceAmount.toFixed(2)}`],
        ['', ''],
        ['Total Amount', `₹${invoice.grandTotal.toFixed(2)}`]
      ]
    };

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