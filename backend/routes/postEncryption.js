const Cryptr = require('cryptr');

let encrypter = {};

encrypter.encrypt = (text, secret) => {
	const cryptr = new Cryptr(secret);
	return cryptr.encrypt(text);
};

encrypter.decrypt = (text, secret) => {
	const cryptr = new Cryptr(secret);
	return cryptr.decrypt(text);
};

encrypter.randomString = (length) => {
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

module.exports = encrypter;
