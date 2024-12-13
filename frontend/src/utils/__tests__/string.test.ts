import { getFirstLetters, getFullName } from '../string';

describe('String Utils', () => {
  describe('getFirstLetters', () => {
    it('returns uppercase initials from first and last name', () => {
      expect(getFirstLetters('john', 'doe')).toBe('JD');
      expect(getFirstLetters('mary', 'smith')).toBe('MS');
      expect(getFirstLetters('ALICE', 'JONES')).toBe('AJ');
    });
  });

  describe('getFullName', () => {
    it('returns properly capitalized full name', () => {
      expect(getFullName('john', 'doe')).toBe('John Doe');
      expect(getFullName('MARY', 'SMITH')).toBe('Mary Smith');
      expect(getFullName('aLiCe', 'jOnEs')).toBe('Alice Jones');
    });
  });
});
