import { JWTDecodeProtocol } from "../../protocols/jwt-decode-protocol";
import decodeJWT from "jwt-decode";

export class JWTDecode implements JWTDecodeProtocol {
  decode(token: string): string {
    return decodeJWT(token);
  }
}
