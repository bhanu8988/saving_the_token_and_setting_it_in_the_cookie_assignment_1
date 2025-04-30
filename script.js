require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// 1. Create a JWT token
const payload = { userId: 123, role: 'admin' };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Original JWT:', token);

// 2. Encrypt the JWT
const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENC_SECRET, process.env.ENC_IV);
let encrypted = cipher.update(token, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Encrypted JWT:', encrypted);

// 3. Decrypt the JWT
const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENC_SECRET, process.env.ENC_IV);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted JWT:', decrypted);

// 4. Verify
const decoded = jwt.verify(decrypted, process.env.JWT_SECRET);
console.log('Decoded Payload:', decoded);
