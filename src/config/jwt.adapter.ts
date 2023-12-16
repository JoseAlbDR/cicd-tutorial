import jwt from 'jsonwebtoken';

interface JWTAdapterPayload {
  name: string;
  email: string;
}

export class JWTAdapter {
  constructor(public readonly seed: string) {}

  public generateToken(payload: JWTAdapterPayload, duration: string = '2h') {
    return new Promise((resolve) => {
      jwt.sign(payload, this.seed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  public validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, this.seed, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded);
      });
    });
  }
}
