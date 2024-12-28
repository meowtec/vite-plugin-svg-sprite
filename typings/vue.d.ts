declare module '*.svg' {
  import { Component } from 'vue';

  const component: Component<SVGAttributes<SVGElement>>;
  export default component;
  export const attributes: {
    width?: string;
    height?: string;
    viewBox?: string;
  };
}
