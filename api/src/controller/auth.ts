import { prisma } from '../clients/prisma';
import * as bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import { issueToken } from '../utils/token';

export async function signInResolver({
    username,
    password,
}: {
    username: string;
    password: string;
}): Promise<{
    token: string;
}> {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Incorrect username or password',
        });
    }

    return { token: await issueToken(user) };
}
