import { defineComponent, h } from 'vue';
import { type Adapter } from '../types.js';
import { capitalizeFirstLetter } from '../utils.js';

export const adapter: Adapter = (id, name) => defineComponent({
  name: `Icon${capitalizeFirstLetter(name)}`,
  setup(props, { attrs }) {
    return () => h('svg', {
      width: '1em',
      height: '1em',
      ...attrs,
    }, [
      h('use', { 'xlink:href': `#${id}` }),
    ]);
  },
});
