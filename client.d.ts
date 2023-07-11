declare module "*.svg" {
  const symbol: string;
  export default symbol;

  export const size: {
    width: string | number | undefined,
    height: string | number | undefined
  };
}
