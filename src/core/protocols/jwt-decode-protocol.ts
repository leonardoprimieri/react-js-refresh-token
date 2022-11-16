export interface JWTDecodeProtocol {
  decode: (token: string) => string;
}
