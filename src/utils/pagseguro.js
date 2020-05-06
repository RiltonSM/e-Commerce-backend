const axios = require('axios');

const api = axios.create({
    baseURL: "https://ws.sandbox.pagseguro.uol.com.br/v2"
});

module.exports = api;