import { memo, createElement } from 'react';
import { type Adapter } from '../types.js';
import { capitalizeFirstLetter } from '../utils.js';

export const adapter: Adapter = (id, name) => {
  const Icon = memo((props) => (
    createElement('svg', {
      width: '1em',
      height: '1em',
      ...props,
    }, createElement('use', { href: `#${id}` }))
  ));

  Icon.displayName = `Icon${capitalizeFirstLetter(name)}`;

  return Icon;
};
