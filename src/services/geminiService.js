/**
 * Internal system prompt for both AI APIs.
 */
const SYSTEM_PROMPT = `You are ElectIQ, an interactive election education assistant for Indian voters.
Your goal is to explain the Indian election process, democratic rights, and voting steps in simple, engaging language.
When answering questions or analyzing topics, respond ONLY in valid JSON with this exact structure — no markdown, no backticks, raw JSON only:
{
  "title": "What the topic/question is about",
  "summary": "One paragraph plain-language explanation",
  "why_it_matters": "Why this is important for a voter to know",
  "action_required": "Any specific action the voter should take, if applicable",
  "key_terms": ["term: explanation", "term: explanation"],
  "fun_fact": "An interesting trivia about Indian elections related to this topic"
}`;

/**
 * Safely parse JSON from AI response, removing any markdown code fences.
 * @param {string} text - The raw response text
 * @returns {Object} Parsed JSON object
 * @throws {Error} If the text cannot be parsed as valid JSON
 */
function parseJSONSafe(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  try {
    return JSON.parse(cleaned.trim());
  } catch (err) {
    throw new Error("Invalid AI response format");
  }
}

/**
 * Calls the Gemini API to analyze the document.
 * @param {string} text - Document text to analyze
 * @returns {Promise<Object>} A parsed JSON object containing the decoded notice details
 * @throws {Error} If the API request fails or response format is invalid
 */
async function callGemini(text) {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_GEMINI_API_KEY
    : process.env.VITE_GEMINI_API_KEY);

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{
        text: SYSTEM_PROMPT + "\n\nDocument:\n" + text
      }]
    }],
    generationConfig: { temperature: 0.3 }
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
  const rawContent = data.candidates[0].content.parts[0].text;
  
  return parseJSONSafe(rawContent);
}

/**
 * Calls the Groq API to analyze the document.
 * @param {string} text - Document text to analyze
 * @returns {Promise<Object>} A parsed JSON object containing the decoded notice details
 * @throws {Error} If the API request fails or response format is invalid
 */
async function callGroq(text) {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_GROK_API_KEY
    : process.env.VITE_GROK_API_KEY);

  if (!apiKey) {
    throw new Error("VITE_GROK_API_KEY is not set.");
  }

  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
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
  const rawContent = data.choices[0].message.content;
  
  return parseJSONSafe(rawContent);
}

/**
 * Analyzes a given official document or notice using Gemini API with an automatic fallback to Groq API.
 * 
 * @param {string} text - The raw text of the document to analyze.
 * @returns {Promise<Object>} A parsed JSON object containing the decoded notice details.
 * @throws {Error} Throws a user-friendly error if both AI services fail.
 */
async function analyzeDocument(text) {
  // Try Gemini first
  try {
    const result = await callGemini(text);
    console.log("[AI] Using Gemini");
    return result;
  } catch (geminiError) {
    console.warn("[AI] Gemini failed, switching to fallback...");
    // Silently fall through to Groq
  }

  // Fallback to Groq
  try {
    const result = await callGroq(text);
    console.log("[AI] Using Groq fallback");
    return result;
  } catch (groqError) {
    // Both failed — throw a user-friendly error
    throw new Error(
      "Our AI service is temporarily unavailable. Please try again in a moment."
    );
  }
}

export { analyzeDocument };
