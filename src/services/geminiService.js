/**
 * Internal system prompt for ElectIQ.
 */
const SYSTEM_PROMPT = `You are ElectIQ, a friendly and knowledgeable assistant that helps 
Indian citizens understand the election process. You explain things in 
simple, clear language suitable for first-time voters.

You have deep knowledge of:
- The Representation of the People Act 1950 and 1951
- How Lok Sabha and Vidhan Sabha elections work
- Voter registration process (Form 6, 7, 8)
- Election Commission of India procedures
- Model Code of Conduct
- How EVMs and VVPATs work
- Polling day procedures and voter rights
- How to check electoral roll and find polling booth

Always:
- Answer in 2-4 short paragraphs maximum
- Use simple language, avoid jargon
- End with a helpful follow-up suggestion like 'You might also want to know...'
- If asked about a specific state election, mention ECI website for details

Never provide legal advice. Always recommend eci.gov.in for official info.`;

/**
 * Calls the Gemini API for conversational chat.
 */
async function callGeminiChat(question, conversationHistory) {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_GEMINI_API_KEY
    : process.env.VITE_GEMINI_API_KEY);

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

  // Format history for Gemini API
  const contents = conversationHistory.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: question }]
  });

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: contents,
    generationConfig: { temperature: 0.7 }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("No response from Gemini.");
  }
  
  return data.candidates[0].content.parts[0].text;
}

/**
 * Calls the Groq API for conversational chat.
 */
async function callGroqChat(question, conversationHistory) {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_GROK_API_KEY
    : process.env.VITE_GROK_API_KEY);

  if (!apiKey) {
    throw new Error("VITE_GROK_API_KEY is not set.");
  }

  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: "user", content: question }
  ];

  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: messages,
    temperature: 0.7
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Sends a question and conversation history to the AI assistant with fallback.
 * 
 * @param {string} question - The user's new question.
 * @param {Array} conversationHistory - Array of previous messages {role, content}.
 * @returns {Promise<string>} The AI's text response.
 */
export async function askElectionQuestion(question, conversationHistory = []) {
  // Filter history to only include user and assistant messages that have text content
  const validHistory = conversationHistory.filter(msg => 
    (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string' && msg.content.trim() !== ''
  ).map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  try {
    const result = await callGeminiChat(question, validHistory);
    console.log("[AI] Using Gemini");
    return result;
  } catch (geminiError) {
    console.warn("[AI] Gemini failed, switching to fallback...", geminiError);
  }

  try {
    const result = await callGroqChat(question, validHistory);
    console.log("[AI] Using Groq fallback");
    return result;
  } catch (groqError) {
    throw new Error("Our AI service is temporarily unavailable. Please try again in a moment.");
  }
}
