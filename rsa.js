import { crypto, enums } from './dist/openpgp.qjs.js';

async function encrypt() {
    const bits = 1024;
    const { publicParams, privateParams } =
        await crypto.generateParams(
            enums.publicKey.rsaSign,
            bits,
        );
    const { n, e, d, p, q, u } = {
        ...publicParams,
        ...privateParams,
    };
    const message = crypto.generateSessionKey(
        enums.symmetric.aes256,
    );
    console.log(message);

    const encrypted = await crypto.publicKey.rsa.encrypt(
        message,
        n,
        e,
    );

    const decrypted = await crypto.publicKey.rsa.decrypt(
        encrypted,
        n,
        e,
        d,
        p,
        q,
        u,
    );
    console.log(decrypted);
}

await encrypt();
