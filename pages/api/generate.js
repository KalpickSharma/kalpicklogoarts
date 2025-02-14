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

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a creative design prompt generator specializing in ${type} design. Generate detailed, inspiring prompts that include style, mood, target audience, and key elements.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating prompt', error: error.message });
  }
}
