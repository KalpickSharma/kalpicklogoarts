import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt, type } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a mood board for ${type} design with the following brief: ${prompt}. Include various design elements, color schemes, and visual inspiration.`,
      n: 3,
      size: "1024x1024",
    });

    const images = response.data.map(item => item.url);
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating mood board', error: error.message });
  }
}
