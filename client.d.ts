declare module "*.svg" {
  const symbol: string;
  export default symbol;
  export const width: string | number | undefined;
  export const height: string | number | undefined;
}
