import { classed } from '@tw-classed/react';

export const Tool = classed('button', {
  variants: {
    active: {
      true: 'text-white',
      false: 'text-white/50',
    },
  },
  defaultVariants: {
    active: false,
  },
});
