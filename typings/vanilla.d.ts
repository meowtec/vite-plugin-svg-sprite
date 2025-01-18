declare module '*.svg' {
  const symbolId: string;
  export default symbolId;
  export const attributes: {
    width?: string;
    height?: string;
    viewBox?: string;
  };
}
