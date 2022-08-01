import { User } from '@prisma/client';
import * as jose from 'jose';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { TRPCError } from '@trpc/server';

const privateKey = crypto.createPrivateKey(
    fs.readFileSync(path.join(__dirname, '..', '..', 'certs', 'private.pem')),
);
const publicKey = crypto.createPublicKey(
    fs.readFileSync(path.join(__dirname, '..', '..', 'certs', 'private.pem')),
);

export async function issueToken(user: User): Promise<string> {
    const jwt = await new jose.SignJWT({ sub: user.id })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(privateKey);
    return jwt;
}

export async function decodeAndVerifyToken(
    jwt: string,
): Promise<{ userId: string }> {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey, {
        algorithms: ['RS256'],
    });

    return { userId: payload.sub! };
}
