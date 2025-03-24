const bcrypt = require("bcryptjs");

const hashedPassword = "$2b$10$nfs4QlwgqhQn.PzyofWP4u4s5/XByw9rIEUX8AAcq.s/Iyilukb32"; // MongoDB'deki hash
const enteredPassword = "anan"; // Postman'da girdiğin şifre

const isMatch = bcrypt.compareSync(enteredPassword, hashedPassword);
console.log("Password Match Test Result:", isMatch);
