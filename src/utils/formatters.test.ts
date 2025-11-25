import { describe, it, expect } from 'vitest';
import { formatDate, getPriorityLabel } from './formatters';

describe('Utility: formatters', () => {
  
  describe('getPriorityLabel', () => {
    it('returns "High" for priority 1', () => {
      expect(getPriorityLabel(1)).toBe('High');
    });

    it('returns "Medium" for priority 2', () => {
      expect(getPriorityLabel(2)).toBe('Medium');
    });

    it('returns "Low" for priority 3', () => {
      expect(getPriorityLabel(3)).toBe('Low');
    });

    it('returns "Unknown" for unmapped priorities', () => {
      expect(getPriorityLabel(0)).toBe('Unknown');
      expect(getPriorityLabel(99)).toBe('Unknown');
    });
  });

  describe('formatDate', () => {
    it('formats a valid ISO string to en-US format', () => {
      const isoDate = '2023-05-15T10:30:00Z'; 
      const result = formatDate(isoDate);

      expect(result).toContain('2023');
      expect(result).toContain('/');
      expect(result).toMatch(/(AM|PM)/);
    });

    it('handles "Invalid Date" gracefully (optional safety check)', () => {
      const result = formatDate('not-a-date');
      expect(result).toBe('Invalid Date');
    });
  });
});