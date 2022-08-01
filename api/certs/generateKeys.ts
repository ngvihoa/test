import crypto from "crypto";
import fs from "fs";
import path from 'path';

const {privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "spki",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
    },
});

fs.writeFileSync(path.join(__dirname, "private.pem"), privateKey);
fs.writeFileSync(path.join(__dirname, "public.pem"), publicKey);