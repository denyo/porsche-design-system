import { throwIfParentIsNotOfKind } from './throwIfParentIsNotOfKind';

it('should throw error if parent tag does not match', () => {
  const parent = document.createElement('div');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-grid')).toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-grid', 'p-accordion'])).toThrow();
});

it('should not throw error if parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-grid')).not.toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-grid', 'p-accordion'])).not.toThrow();
});

it('should not throw error if prefixed parent tag matches', () => {
  const parent = document.createElement('my-prefix-p-grid');
  const child = document.createElement('my-prefix-p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-grid')).not.toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-grid', 'p-accordion'])).not.toThrow();
});
