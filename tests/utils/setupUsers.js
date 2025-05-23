const request = require('../utils/apiClient');
const { waitForUser } = require('../utils/userWaitUtils');

async function setupUsers(users, waitAfterPostMs = 5000) {
  // Cria todos os usuários
  for (const user of users) {
    await request
      .post('/user')
      .send({
        id: user.idName,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        userStatus: user.userStatus,
      })
      .expect(200);

    // console.log('POST status:', postRes.statusCode, 'body:', postRes.body);
  }

  // guarda 5 segundos para dar tempo da API processar as criações
  await new Promise((resolve) => setTimeout(resolve, waitAfterPostMs));

  // Confirma que todos os usuários estão disponíveis
  for (const user of users) {
    const getRes = await waitForUser(user.username);
    expect(getRes.statusCode).toBe(200);
    // console.log(`GET depois do POST para ${user.username}:`, getRes.statusCode, getRes.body);
    if (!getRes.body || getRes.body.username !== user.username) {
      console.log(`Usuário ${user.username} não encontrado após criação`);
    }
  }
}

module.exports = { setupUsers };
