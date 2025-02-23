import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Contact Schema with timestamps
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'] 
  }
}, { 
  timestamps: true 
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form API Endpoint with better error handling
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create new contact
    const newContact = new Contact({ name, email, message });
    
    // Validate before saving
    const validationError = newContact.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(validationError.errors).map(err => err.message)
      });
    }

    // Save to database
    await newContact.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you! Your message has been sent successfully.' 
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all contacts (for testing)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
