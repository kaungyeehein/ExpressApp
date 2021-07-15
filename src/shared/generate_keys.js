const crypto = require('crypto');

// SHA 256-bit key generation for secret code
const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
console.table({ key1, key2 });