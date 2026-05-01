/**
 * Analyzes a given official document or notice using the Gemini API and returns a structured JSON response.
 *
 * @param {string} text - The raw text of the document to analyze.
 * @returns {Promise<Object>} A parsed JSON object containing the decoded notice details.
 * @throws {Error} Throws an error if the HTTP request fails or if the response cannot be parsed as valid JSON.
 */
export const analyzeDocument = async (text) => {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_GEMINI_API_KEY
    : process.env.VITE_GEMINI_API_KEY);

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

  const systemPrompt = `You are NoticeDecoder, an expert at explaining Indian government, 
legal, banking, and official documents to ordinary citizens in simple 
language. The user will provide text from a notice or document. 
Your job is to decode it completely.

Respond ONLY in valid JSON with this exact structure:
{
  "title": "What type of document this is (e.g. Electricity Disconnection Notice)",
  "summary": "One paragraph plain-language summary of what the document says",
  "what_it_means": "What this practically means for the person receiving it",
  "action_required": "Exactly what the person needs to do next (be specific)",
  "deadline": "Any deadline mentioned, or null if none",
  "urgency_level": "LOW or MEDIUM or HIGH or CRITICAL",
  "key_terms": ["array", "of", "confusing", "terms", "explained briefly"],
  "is_this_serious": true or false,
  "dont_panic_message": "A reassuring one-liner if the document looks scary"
}

Never add markdown formatting. Return raw JSON only.`;

  const payload = {
    system_instruction: {
      parts: [
        { text: systemPrompt }
      ]
    },
    contents: [
      {
        parts: [
          { text: text }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  try {
    const rawContent = data.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(rawContent);
    return parsedData;
  } catch (error) {
    throw new Error("Failed to parse JSON response from Gemini API: " + error.message);
  }
};
