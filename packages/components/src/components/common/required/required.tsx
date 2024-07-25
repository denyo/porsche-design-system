import { type FunctionalComponent, h } from '@stencil/core';

export const Required: FunctionalComponent = () => {
  return (
    <span class="required" aria-hidden="true">
      {' '}
      *
    </span>
  );
};
