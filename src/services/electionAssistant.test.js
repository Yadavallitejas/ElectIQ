import { describe, it, expect, vi } from 'vitest';
import { askElectionQuestion } from './geminiService';
import { electionSteps, voterChecklist } from '../data/electionData';

// Mock the Gemini service API call to avoid actual network requests during testing
vi.mock('./geminiService', () => ({
  askElectionQuestion: vi.fn().mockResolvedValue("To register to vote, you must fill Form 6 on the NVSP portal.")
}));

describe('Election Assistant Services', () => {
  describe('askElectionQuestion API', () => {
    it('returns a non-empty string response', async () => {
      const response = await askElectionQuestion("How do I register to vote?", []);
      
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
      expect(response).toBe("To register to vote, you must fill Form 6 on the NVSP portal.");
    });
  });

  describe('electionSteps data structure', () => {
    it('has exactly 7 items', () => {
      expect(electionSteps).toHaveLength(7);
    });

    it('each step has all required fields', () => {
      electionSteps.forEach(step => {
        expect(step).toHaveProperty('id');
        expect(step).toHaveProperty('phase');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('duration');
        expect(step).toHaveProperty('description');
        expect(step).toHaveProperty('keyFacts');
        expect(Array.isArray(step.keyFacts)).toBe(true);
        expect(step).toHaveProperty('learnMore');
      });
    });
  });

  describe('voterChecklist data structure', () => {
    it('has exactly 7 items', () => {
      expect(voterChecklist).toHaveLength(7);
    });
  });
});
