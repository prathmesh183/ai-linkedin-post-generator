const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TONE_DESCRIPTIONS = {
  professional: "formal, authoritative, and polished",
  casual: "friendly, conversational, and approachable",
  motivational: "inspiring, energetic, and uplifting",
  storytelling: "narrative-driven with a personal anecdote",
  humorous: "witty, light-hearted, and fun",
};

const extractHashtags = (text) => {
  const matches = text.match(/#[\w]+/g) || [];
  return [...new Set(matches)];
};

const generatePost = async (req, res, next) => {
  try {
    const { topic, tone, keywords = [] } = req.body;
    const keywordSection = keywords.length > 0 ? `\nIncorporate these keywords: ${keywords.join(", ")}` : "";

    const prompt = `You are an expert LinkedIn content creator. Write a high-performing LinkedIn post.

Topic: ${topic}
Tone: ${tone} — ${TONE_DESCRIPTIONS[tone]}${keywordSection}

Requirements:
1. Start with a powerful hook
2. Write 150-300 words
3. Use short paragraphs
4. End with a call-to-action
5. Add 5-8 relevant hashtags on a new line
6. Write the post directly, no intro text`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional LinkedIn content strategist." },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const generatedPost = completion.choices[0].message.content.trim();
    const hashtags = extractHashtags(generatedPost);

    res.status(200).json({
      success: true,
      data: { generatedPost, hashtags, characterCount: generatedPost.length },
    });
  } catch (error) {
    if (error?.status === 429) error.message = "OpenAI rate limit reached. Try again shortly.";
    next(error);
  }
};

module.exports = { generatePost };
