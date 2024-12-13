import { cn } from '../cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('base-class', 'additional-class')).toBe(
      'base-class additional-class',
    );
  });

  it('handles conditional classes', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
    expect(cn('base', !isActive && 'inactive')).toBe('base');
  });

  it('merges tailwind classes efficiently', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-sm text-gray-500', 'text-lg')).toBe(
      'text-gray-500 text-lg',
    );
  });

  it('handles array and object inputs', () => {
    expect(cn(['base', 'flex'], { active: true, disabled: false })).toBe(
      'base flex active',
    );
  });
});
