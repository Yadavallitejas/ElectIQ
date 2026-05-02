import { describe, it, expect } from 'vitest';
import { validateChatInput, sanitizeInput } from './validation';

describe('validation utility', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<p>Hello</p>')).toBe('Hello');
      expect(sanitizeInput('<script>alert("hack")</script>')).toBe('alert("hack")');
    });

    it('returns empty string for non-strings', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('validateChatInput', () => {
    it('rejects empty strings', () => {
      const result = validateChatInput('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Input cannot be empty.');
    });

    it('rejects strings over 500 characters', () => {
      const longString = 'a'.repeat(501);
      const result = validateChatInput(longString);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Input cannot exceed 500 characters.');
    });

    it('accepts valid strings and returns sanitized text', () => {
      const result = validateChatInput('How do I vote?');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
      expect(result.sanitizedText).toBe('How do I vote?');
    });
  });
});
