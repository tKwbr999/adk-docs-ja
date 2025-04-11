import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const hasError = false;
    expect(cn('base', isActive && 'active', hasError && 'error')).toBe('base active');
    expect(cn('base', !isActive && 'active', !hasError && 'no-error')).toBe('base no-error');
  });

  it('should handle falsy values', () => {
    expect(cn('base', null, undefined, false, '', 'extra')).toBe('base extra');
  });

  it('should merge tailwind classes and resolve conflicts', () => {
    // tailwind-merge の機能: 後勝ちで衝突を解決
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('px-2 py-1', 'p-3')).toBe('p-3'); // p-3 が px-*, py-* を上書き
  });

  it('should handle complex combinations', () => {
    const condition = true;
    expect(
      cn(
        'base-style',
        condition ? 'conditional-style' : null,
        'p-4',
        'text-lg',
        'bg-red-100',
        'p-2', // p-4 を上書き
        condition && 'bg-green-100' // bg-red-100 を上書き
      )
    ).toBe('base-style conditional-style text-lg p-2 bg-green-100');
  });
});
