// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

app.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
    })
    res.json(response.text)
    
  } catch (error) {
   
  }
});

app.listen(5000, () => {
  console.log('✅ Gemini server running at http://localhost:5000');
});
