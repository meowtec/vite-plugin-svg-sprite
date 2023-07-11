declare module "*.svg" {
  const symbol: string;
  export default symbol;
  export const width: string | null;
  export const height: string | null;
}
