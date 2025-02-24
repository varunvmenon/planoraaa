import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;
let visionModel: any = null;

export const initializeGemini = (apiKey: string) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
    visionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    throw new Error('Failed to initialize Gemini API');
  }
};

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!model) {
    throw new Error('Gemini API not initialized. Please provide an API key.');
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate AI response');
  }
};

const fileToGenerativePart = async (imageData: string) => {
  // Remove the data URL prefix and convert base64 to Uint8Array
  const base64Data = imageData.split(',')[1];
  const binaryData = atob(base64Data);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  
  return {
    inlineData: {
      data: base64Data,
      mimeType: 'image/jpeg'
    }
  };
};

export const analyzeVenueImage = async (imageData: string, style: string) => {
  if (!visionModel) {
    throw new Error('Vision model not initialized');
  }

  try {
    const imagePart = await fileToGenerativePart(imageData);
    
    const prompt = `Analyze this venue image and suggest 3 different decoration concepts in the ${style} style. 
    For each concept, provide:
    1. A title
    2. A detailed description of how the decorations would enhance the space
    3. An estimated price range
    4. Specific decoration elements and their placement
    Format the response as JSON with the following structure:
    [
      {
        "id": number,
        "title": string,
        "description": string,
        "price": number,
        "style": string
      }
    ]`;

    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    return JSON.parse(text);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze venue image');
  }
};

export const generateDecoratedImage = async (
  originalImage: string,
  style: string,
  description: string
) => {
  if (!visionModel) {
    throw new Error('Vision model not initialized');
  }

  try {
    const imagePart = await fileToGenerativePart(originalImage);
    
    const prompt = `Based on this venue image, generate a new image that shows how it would look decorated in the ${style} style with the following decorations: ${description}. 
    Maintain the original venue's structure but add the described decorative elements.`;

    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    
    // Extract the generated image from the response
    // Note: This is a placeholder as the actual implementation would depend on
    // how Gemini returns the generated image
    return response.text(); // This should be modified based on actual API response format
  } catch (error) {
    console.error('Error generating decorated image:', error);
    throw new Error('Failed to generate decorated venue image');
  }
};