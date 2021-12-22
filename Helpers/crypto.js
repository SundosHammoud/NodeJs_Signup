const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';//crypto.randomBytes(32);
const iv = Buffer.alloc(16, 0); //crypto.randomBytes(16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encryptedData = cipher.update(text, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    return encryptedData;
};

const decrypt = (encryptedData) => {
   
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    decryptedData += decipher.final("utf8");

    return decryptedData;
};

module.exports = {
    encrypt,
    decrypt
};