import { JWTDecodeProtocol } from "../../protocols/jwt-decode-protocol";
import decodeJWT from "jwt-decode";

export class JWTDecode implements JWTDecodeProtocol {
  decode<T>(token: string): T {
    return decodeJWT(token);
  }
}
