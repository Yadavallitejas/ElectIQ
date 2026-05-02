/**
 * Sanitizes input text by removing HTML tags.
 * 
 * @param {string} text - The input text to sanitize.
 * @returns {string} The sanitized text.
 */
export const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/<[^>]*>?/gm, '');
};

/**
 * Validates chat input against length constraints.
 * 
 * @param {string} text - The input text to validate.
 * @returns {Object} An object with `isValid` boolean and an `error` message string.
 */
export const validateChatInput = (text) => {
  const sanitized = sanitizeInput(text).trim();
  
  if (sanitized.length === 0) {
    return { isValid: false, error: 'Input cannot be empty.' };
  }
  
  if (sanitized.length > 500) {
    return { isValid: false, error: 'Input cannot exceed 500 characters.' };
  }
  
  return { isValid: true, error: null, sanitizedText: sanitized };
};
