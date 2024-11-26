const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['general', 'maintenance', 'emergency', 'event', 'notice', 'other'],
        default: 'general'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: [true, 'Author information is required']
    },
    targetAudience: [{
        type: String,
        enum: ['all', 'residents', 'owners', 'tenants', 'staff', 'security'],
        default: ['all']
    }],
    validFrom: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date
    },
    attachments: [{
        name: String,
        url: String,
        type: String,
        size: Number,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    acknowledgement: {
        required: {
            type: Boolean,
            default: false
        },
        acknowledgedBy: [{
            resident: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resident'
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }]
    },
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resident'
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        edited: {
            type: Boolean,
            default: false
        }
    }],
    metadata: {
        views: {
            type: Number,
            default: 0
        },
        lastModified: {
            type: Date,
            default: Date.now
        },
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resident'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add indexes for common queries
announcementSchema.index({ status: 1 });
announcementSchema.index({ category: 1 });
announcementSchema.index({ priority: 1 });
announcementSchema.index({ validFrom: 1, validUntil: 1 });
announcementSchema.index({ pinned: 1 });
announcementSchema.index({ 'metadata.views': -1 });

// Virtual for checking if announcement is active
announcementSchema.virtual('isActive').get(function() {
    const now = new Date();
    return (
        this.status === 'published' &&
        (!this.validUntil || this.validUntil > now) &&
        this.validFrom <= now
    );
});

// Pre-save middleware to handle validation
announcementSchema.pre('save', function(next) {
    // Ensure validUntil is after validFrom if set
    if (this.validUntil && this.validFrom >= this.validUntil) {
        next(new Error('Valid until date must be after valid from date'));
    }
    
    // Auto-archive expired announcements
    const now = new Date();
    if (this.validUntil && this.validUntil < now) {
        this.status = 'archived';
    }
    
    next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);
    
module.exports = Announcement;
