const axios = require('axios');

const apiV3 = axios.create({
    baseURL: "https://ws.sandbox.pagseguro.uol.com.br/v3"
});

module.exports = apiV3;