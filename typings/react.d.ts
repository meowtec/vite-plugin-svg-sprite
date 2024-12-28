declare module '*.svg' {
  import { SVGAttributes, ComponentClass } from 'react';

  const Component: ComponentClass<SVGAttributes<SVGElement>>;
  export default Component;
  export const attributes: {
    width?: string;
    height?: string;
    viewBox?: string;
  };
}
