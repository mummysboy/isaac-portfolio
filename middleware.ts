import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

const COGNITO_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!;
const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION!;
const JWKS_URL = `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/jwks.json`;

let jwks: any = null;
async function getJwks() {
  if (!jwks) {
    const res = await fetch(JWKS_URL);
    jwks = await res.json();
  }
  return jwks;
}

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;
  // Only protect /personal/* routes except /personal itself
  if (pathname.startsWith('/personal') && pathname !== '/personal') {
    const token = request.cookies.get('id_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/personal', request.url));
    }
    try {
      const { keys } = await getJwks();
      // Find the key that matches the JWT's kid
      const { header } = JSON.parse(
        Buffer.from(token.split('.')[0], 'base64').toString()
      );
      const jwk = keys.find((k: any) => k.kid === header.kid);
      if (!jwk) throw new Error('JWK not found');
      const publicKey = await importJWK(jwk, 'RS256');
      await jwtVerify(token, publicKey, {
        issuer: `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_POOL_ID}`,
        audience: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      });
      // If verification passes, allow access
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/personal', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/personal/:path*'],
};
