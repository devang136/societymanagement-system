const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const residentSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        last: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    unit: {
        building: {
            type: String,
            required: [true, 'Building number/name is required']
        },
        number: {
            type: String,
            required: [true, 'Unit number is required']
        }
    },
    role: {
        type: String,
        enum: ['resident', 'admin', 'security'],
        default: 'resident'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    familyMembers: [{
        name: String,
        relationship: String,
        age: Number
    }],
    vehicles: [{
        type: {
            type: String,
            enum: ['car', 'bike', 'other']
        },
        number: String,
        model: String
    }],
    moveInDate: {
        type: Date,
        default: Date.now
    },
    documents: [{
        type: {
            type: String,
            enum: ['id_proof', 'lease_agreement', 'other']
        },
        url: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String
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

// Hash password before saving
residentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
residentSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for full name
residentSchema.virtual('fullName').get(function() {
    return `${this.name.first} ${this.name.last}`;
});

// Add indexes for common queries
residentSchema.index({ 'name.first': 1, 'name.last': 1 });
residentSchema.index({ email: 1 }, { unique: true });
residentSchema.index({ 'unit.building': 1, 'unit.number': 1 });
residentSchema.index({ status: 1 });

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;
