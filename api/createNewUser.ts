import { prisma } from "./src/clients/prisma";


async function createUser() {
    await prisma.user.create({ data: { username: 'hoa', password: '$2b$10$GQGuHpna/82AQ1h1gybNPOtj1ZZoYMHzoKV3wznUC3ucyoiral8fi' } })
}

createUser().then(() => console.log("OK"));