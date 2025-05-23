const request = require('../utils/apiClient');

let testFinished = false;

// Função de espera ativa para garantir que o usuário foi criado, atualizado e deletado
async function waitForUser(username, maxAttempts = 20, intervalMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await request.get(`/user/${username}`);

    if (res.statusCode === 200) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error(
    `User ${username} was not available after ${(maxAttempts * intervalMs) / 1000} seconds`
  );
}

// No afterAll ou afterEach do Jest, set testFinished = true para evitar logs posteriores
afterAll(() => {
  testFinished = true;
});

module.exports = { waitForUser };
