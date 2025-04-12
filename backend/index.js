const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());

// 1. Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure multer with absolute paths and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running', uploadDir });
});

// Data extraction endpoint
app.post('/extract-data', upload.single('image_file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No valid image file uploaded' });
  }

  const imagePath = req.file.path;
  let extractedData;

  try {
    // Verify file exists before processing
    if (!fs.existsSync(imagePath)) {
      throw new Error('File was not saved correctly');
    }

    // Read the image file
    const imageData = fs.readFileSync(imagePath);
    const imageBase64 = imageData.toString('base64');

    // Define prompt for data extraction
    const prompt = `
    Extract the following information from the image and return it as a well-structured JSON:  

    1. **Ingredients:**  
       - List all ingredients along with their percentages.  

    2. **Nutritional Facts:**  
       - Per 100g  
       - Per serving  
       - Include: calories, fats (saturated, trans, unsaturated), carbohydrates (sugars, fiber), protein, sodium, cholesterol, vitamins, and minerals.  

    3. **Serving Information:**  
       - Serving size  
       - Servings per pack  

    4. **Health Analysis:**  
       - Identify which nutrients exceed daily human dietary recommendations (based on standard guidelines like FDA/WHO).  
       - Calculate the maximum recommended daily consumption of this product based on:  
         - Total calories  
         - Sugar content  
         - Sodium levels  
         - Saturated/trans fats  
       - Provide a brief summary of how much a person can safely consume per day without exceeding healthy limits.  

    Ensure the JSON keys are properly structured and human-readable. If any data is missing or unclear, note it as "Not Specified".  
    `;

    // Generate response from AI model
    const result = await model.generateContent([
      { 
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBase64
        }
      },
      prompt
    ]);

    const response = await result.response;
    const text = response.text();

    // Try parsing JSON
    try {
      extractedData = JSON.parse(text);
    } catch (e) {
      extractedData = { 
        error: "Failed to parse JSON response", 
        raw_response: text 
      };
    }

  } catch (error) {
    console.error('Processing error:', error);
    return res.status(500).json({ 
      error: error.message,
      details: 'Failed to process image'
    });
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }
  }

  res.json(extractedData);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      error: 'File upload error',
      details: err.message 
    });
  }
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
});