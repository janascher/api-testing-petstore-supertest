const supertest = require('supertest');
const apiConfig = require('../config/apiConfig');

const apiClient = supertest(apiConfig.baseURL);

module.exports = apiClient;
